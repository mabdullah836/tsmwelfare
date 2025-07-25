export type ChangeStatusOptions = {
  resource: 'application' | 'volunteer' | 'media';
  id: string;
  newStatus: string;
  statusMap?: {
    approve: string;
    reject: string;
    [key: string]: string;
  };
};

export async function changeResourceStatus({ resource, id, newStatus, statusMap }: ChangeStatusOptions): Promise<{ success: boolean; message: string }> {
  // Map resource to endpoint (donation logic removed)
  const endpoint = `/api/${resource}/${id}`;
  // Determine rejection status value
  const rejectStatus = statusMap?.reject || 'rejected';
  // If status is rejection, DELETE
  if (newStatus === rejectStatus) {
    const response = await fetch(endpoint, { method: 'DELETE' });
    const data = await response.json();
    return { success: response.ok && data.success, message: data.message || '' };
  } else {
    // PATCH for approval or other status
    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const data = await response.json();
    return { success: response.ok && data.success, message: data.message || '' };
  }
}