export async function fetchFromAPI<T = any>(
    endpoint: string,
    options?: RequestInit,
    revalidate?: number
  ): Promise<T | null> {
    try {
      const fetchOptions: RequestInit = {
        ...options,
        next: revalidate ? { revalidate } : undefined,
      };
  
      // Handle both client and server environments
      let fullUrl = endpoint;
      
      if (!endpoint.startsWith('http')) {
        if (typeof window !== 'undefined') {
          // Client-side: use relative URL
          fullUrl = endpoint;
        } else {
          // Server-side: construct absolute URL
          const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
          const host = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000';
          fullUrl = `${protocol}://${host}${endpoint}`;
        }
      }
      const response = await fetch(fullUrl, fetchOptions)
  
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`)
  
      const data = await response.json()
  
      return data
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error)
      return null
    }
  }
  