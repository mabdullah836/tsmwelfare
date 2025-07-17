"use client"

import { useState, useCallback, ChangeEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadIcon, ImageIcon, VideoIcon, XIcon, CheckIcon } from "lucide-react";
import { FormInput } from '@/components/ui/form-input';
import { FileUpload } from '@/components/ui/file-upload';

interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "video";
  size: string;
  previewUrl: string;
  status: "uploading" | "completed" | "error";
  progress: number;
}

export function MediaUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }, []);

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "video" as const,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      previewUrl: URL.createObjectURL(file),
      status: "uploading" as const,
      progress: 0,
    })) as UploadedFile[];

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Process files sequentially
    newFiles.reduce(async (promise, file) => {
      await promise;
      await uploadFile(file);
    }, Promise.resolve());
  };

  const uploadFile = async (file: UploadedFile) => {
    try {
      const formData = new FormData();
      const actualFile = await getFileFromPreview(file.previewUrl, file.name);
      formData.append('file', actualFile);

      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadedFiles(prev => 
            prev.map(f => f.id === file.id ? { ...f, progress } : f)
          );
        }
      });

      await new Promise<void>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            setUploadedFiles(prev => 
              prev.map(f => f.id === file.id ? { 
                ...f, 
                status: 'completed', 
                previewUrl: response.url 
              } : f)
            );
            resolve();
          } else {
            reject(new Error('Upload failed'));
          }
        };

        xhr.onerror = () => reject(new Error('Network error'));
        xhr.open('POST', '/api/media/upload');
        xhr.send(formData);
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadedFiles(prev => 
        prev.map(f => f.id === file.id ? { ...f, status: 'error' } : f)
      );
    }
  };

  const getFileFromPreview = async (previewUrl: string, fileName: string) => {
    const response = await fetch(previewUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Media Files</CardTitle>
          <CardDescription>
            Upload images and videos to your media library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="url">Add from URL</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports: JPG, PNG, GIF, MP4, MOV, AVI (Max 100MB)
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={e => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="media-url">Media URL</Label>
                  <Input id="media-url" placeholder="https://example.com/image.jpg" type="url" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media-title">Title</Label>
                  <Input id="media-title" placeholder="Enter media title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media-description">Description</Label>
                  <Textarea id="media-description" placeholder="Enter media description" rows={3} />
                </div>
                <Button>Add Media</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>Track your file uploads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map(file => (
                <div key={file.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {file.type === "image" ? (
                      <ImageIcon className="h-8 w-8 text-blue-600" />
                    ) : (
                      <VideoIcon className="h-8 w-8 text-purple-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{file.size}</p>

                    {file.status === "uploading" && (
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploading... {file.progress}%
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        file.status === "completed"
                          ? "default"
                          : file.status === "uploading"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {file.status === "completed" && <CheckIcon className="h-3 w-3 mr-1" />}
                      {file.status}
                    </Badge>

                    <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}