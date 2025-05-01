  import { headers } from 'next/headers';

  export default async function GetPath() {
    const headersList = await headers();
    const fullUrl = headersList.get('x-invoke-path') || headersList.get('referer');
    
    return fullUrl
  }