
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

// Define types
interface PlatformAPI {
  platform: string;
  fetchTopInfluencers: () => Promise<any[]>;
}

interface Influencer {
  name: string;
  handle: string;
  followers: number;
  image_url: string;
  category: string;
  platform: string;
  country: string;
  region: string;
  description: string;
  rank: number;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a Supabase client
const createSupabaseClient = (req: Request) => {
  const authHeader = req.headers.get('Authorization')!
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  
  return createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false }
  })
}

// Mock implementations for different social media platforms
// In a real application, these would make actual API calls
const platformAPIs: Record<string, PlatformAPI> = {
  instagram: {
    platform: 'instagram',
    fetchTopInfluencers: async () => {
      console.log('Fetching top Instagram influencers')
      return generateMockData('instagram', [
        'entertainment', 'sports', 'fashion', 'technology', 'music'
      ])
    }
  },
  twitter: {
    platform: 'twitter',
    fetchTopInfluencers: async () => {
      console.log('Fetching top Twitter influencers')
      return generateMockData('twitter', [
        'politics', 'news', 'technology', 'sports', 'entertainment'
      ])
    }
  },
  youtube: {
    platform: 'youtube',
    fetchTopInfluencers: async () => {
      console.log('Fetching top YouTube influencers')
      return generateMockData('youtube', [
        'gaming', 'education', 'entertainment', 'music', 'howto'
      ])
    }
  },
  tiktok: {
    platform: 'tiktok',
    fetchTopInfluencers: async () => {
      console.log('Fetching top TikTok influencers')
      return generateMockData('tiktok', [
        'dance', 'comedy', 'lifestyle', 'food', 'fitness'
      ])
    }
  },
  facebook: {
    platform: 'facebook',
    fetchTopInfluencers: async () => {
      console.log('Fetching top Facebook influencers')
      return generateMockData('facebook', [
        'business', 'news', 'entertainment', 'community', 'education'
      ])
    }
  }
}

// Generate mock data for demonstration purposes
function generateMockData(platform: string, categories: string[]): Influencer[] {
  const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']
  const countries = ['USA', 'UK', 'China', 'India', 'Brazil', 'Australia', 'Japan', 'Germany', 'France', 'Canada']
  
  return Array.from({ length: 100 }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const region = regions[Math.floor(Math.random() * regions.length)]
    const country = countries[Math.floor(Math.random() * countries.length)]
    
    return {
      name: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Star ${i + 1}`,
      handle: `@${platform.toLowerCase()}user${i + 1}`,
      followers: Math.floor(Math.random() * 100000000) + 500000,
      image_url: `https://i.pravatar.cc/300?img=${(i % 70) + 1}`,
      category,
      platform,
      country,
      region,
      description: `Top ${category} creator on ${platform} with a large following from ${country}.`,
      rank: i + 1
    }
  })
}

// Main function to update influencers for all platforms
async function updateAllPlatforms(supabase: any) {
  console.log('Starting to update all platforms')
  const platforms = Object.keys(platformAPIs)
  
  for (const platform of platforms) {
    try {
      console.log(`Processing ${platform}...`)
      const api = platformAPIs[platform]
      const influencers = await api.fetchTopInfluencers()
      
      // Batch insert/update influencers
      const { error } = await supabase
        .from('influencers')
        .upsert(
          influencers.map(inf => ({ 
            ...inf, 
            last_updated: new Date().toISOString() 
          })),
          { onConflict: 'platform,handle' }
        )
      
      if (error) {
        console.error(`Error updating ${platform} influencers:`, error)
      } else {
        console.log(`Successfully updated ${influencers.length} ${platform} influencers`)
      }
    } catch (err) {
      console.error(`Failed to update ${platform}:`, err)
    }
  }
  
  console.log('Completed updating all platforms')
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    const supabase = createSupabaseClient(req)
    
    // Update all platforms
    await updateAllPlatforms(supabase)
    
    return new Response(
      JSON.stringify({ success: true, message: 'Influencers updated successfully' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  } catch (error) {
    console.error('Error in update-influencers function:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  }
})
