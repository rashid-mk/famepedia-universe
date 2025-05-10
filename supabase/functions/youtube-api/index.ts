
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

// Define types
interface YouTubeChannel {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    country?: string;
  };
  statistics: {
    subscriberCount: string;
    viewCount: string;
    videoCount: string;
  };
  brandingSettings?: {
    channel?: {
      country?: string;
    };
  };
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

// Function to map regions based on country
function mapRegion(country: string | undefined): string {
  if (!country) return 'Unknown';
  
  const regionMap: Record<string, string> = {
    'US': 'North America',
    'CA': 'North America',
    'MX': 'North America',
    'GB': 'Europe',
    'DE': 'Europe',
    'FR': 'Europe',
    'IT': 'Europe',
    'ES': 'Europe',
    'JP': 'Asia',
    'KR': 'Asia',
    'CN': 'Asia',
    'IN': 'Asia',
    'AU': 'Oceania',
    'NZ': 'Oceania',
    'BR': 'South America',
    'AR': 'South America',
    'ZA': 'Africa',
    'NG': 'Africa',
    'EG': 'Africa'
  };
  
  return regionMap[country] || 'Unknown';
}

// Function to determine category based on channel description
function determineCategory(description: string): string {
  const categoryKeywords: Record<string, string[]> = {
    'gaming': ['gaming', 'game', 'playthrough', 'gameplay', 'xbox', 'playstation', 'nintendo', 'fortnite', 'minecraft'],
    'music': ['music', 'song', 'singer', 'band', 'concert', 'album', 'rap', 'hip hop', 'rock', 'pop'],
    'education': ['education', 'learn', 'tutorial', 'course', 'study', 'university', 'college', 'school', 'academic'],
    'entertainment': ['entertainment', 'comedy', 'funny', 'humor', 'sketch', 'vlog', 'challenge', 'prank'],
    'howto': ['how to', 'diy', 'tutorial', 'guide', 'tips', 'tricks', 'advice', 'instructional'],
    'sports': ['sports', 'fitness', 'workout', 'exercise', 'gym', 'athlete', 'football', 'basketball', 'soccer'],
    'technology': ['tech', 'technology', 'gadget', 'review', 'unboxing', 'smartphone', 'computer', 'coding', 'programming'],
    'fashion': ['fashion', 'style', 'clothing', 'outfit', 'beauty', 'makeup', 'cosmetics', 'hairstyle'],
    'food': ['food', 'cooking', 'recipe', 'chef', 'baking', 'cuisine', 'meal', 'restaurant', 'kitchen'],
    'travel': ['travel', 'adventure', 'destination', 'tourism', 'vacation', 'journey', 'trip', 'vlog']
  };

  const descriptionLower = description.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (descriptionLower.includes(keyword)) {
        return category;
      }
    }
  }
  
  return 'entertainment'; // Default category
}

// Function to make a real YouTube API call using the YouTube Data API
async function fetchRealYouTubeData(apiKey: string): Promise<YouTubeChannel[]> {
  try {
    console.log('Attempting to fetch real YouTube data');
    
    // Start with a list of popular YouTube channel IDs
    // In a real implementation, you'd use a search endpoint or another method to find top channels
    const popularChannelIds = [
      'UCX6OQ3DkcsbYNE6H8uQQuVA', // MrBeast
      'UCq-Fj5jknLsUf-MWSy4_brA', // T-Series
      'UC-lHJZR3Gqxm24_Vd_AJ5Yw', // PewDiePie
      'UCJ5v_MCY6GNUBTO8-D3XoAg', // Cocomelon
      'UCbCmjCuTUZos6Inko4u57UQ', // SET India
      'UCK8sQmJBp8GCxrOtXWBpyEA', // Google
      'UC_x5XG1OV2P6uZZ5FSM9Ttw', // YouTube
      'UCpEhnqL0y41EpW2TvWAHD7Q', // Dude Perfect
      'UCY30JRSgfhYXA6i6xX1erWg', // WWE
      'UCWJ2lWNubArHWmf3FIHbfcQ'  // NBA
    ];
    
    const requests = popularChannelIds.map(id => 
      fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${id}&key=${apiKey}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
          }
          return response.json();
        })
    );
    
    const responses = await Promise.all(requests);
    
    // Flatten and extract the channel data
    const channels: YouTubeChannel[] = [];
    responses.forEach(response => {
      if (response.items && response.items.length > 0) {
        channels.push(...response.items);
      }
    });
    
    console.log(`Successfully fetched ${channels.length} YouTube channels`);
    return channels;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw error;
  }
}

// Function to convert YouTube API data to our influencer format
function convertToInfluencers(channels: YouTubeChannel[]): Influencer[] {
  return channels.map((channel, index) => {
    const country = channel.brandingSettings?.channel?.country || channel.snippet.country || 'Unknown';
    
    return {
      name: channel.snippet.title,
      handle: `@${channel.snippet.title.toLowerCase().replace(/\s+/g, '')}`,
      followers: parseInt(channel.statistics.subscriberCount) || 0,
      image_url: channel.snippet.thumbnails.high.url,
      category: determineCategory(channel.snippet.description),
      platform: 'youtube',
      country: country,
      region: mapRegion(country),
      description: channel.snippet.description.substring(0, 200) + '...',
      rank: index + 1
    };
  });
}

// Function to fetch mock data if API key is not available or for testing
function generateMockData(): Influencer[] {
  console.log('Generating mock YouTube data');
  
  const categories = ['gaming', 'education', 'entertainment', 'music', 'howto'];
  const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];
  const countries = ['US', 'UK', 'Canada', 'India', 'Brazil', 'Australia', 'Japan', 'Germany', 'France'];
  
  return Array.from({ length: 100 }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    return {
      name: `YouTube Star ${i + 1}`,
      handle: `@youtubestar${i + 1}`,
      followers: Math.floor(Math.random() * 100000000) + 500000,
      image_url: `https://i.pravatar.cc/300?img=${(i % 70) + 1}`,
      category,
      platform: 'youtube',
      country,
      region,
      description: `Top ${category} creator on YouTube with a large following from ${country}.`,
      rank: i + 1
    };
  });
}

// Main function to update YouTube influencers
async function updateYouTubeInfluencers(supabase: any) {
  console.log('Starting YouTube influencer update process');
  
  try {
    // Get YouTube API key (in a real app this would be a secret)
    const { data: credData, error: credError } = await supabase
      .from('platform_credentials')
      .select('api_key')
      .eq('platform', 'youtube')
      .single();
    
    let influencers: Influencer[];
    
    if (credError || !credData || !credData.api_key) {
      console.log('No YouTube API key found, using mock data');
      influencers = generateMockData();
    } else {
      console.log('YouTube API key found, attempting to fetch real data');
      try {
        const channels = await fetchRealYouTubeData(credData.api_key);
        influencers = convertToInfluencers(channels);
      } catch (apiError) {
        console.error('Error with YouTube API:', apiError);
        console.log('Falling back to mock data');
        influencers = generateMockData();
      }
    }
    
    console.log(`Processing ${influencers.length} YouTube influencers`);
    
    // First, delete all existing YouTube influencers
    const { error: deleteError } = await supabase
      .from('influencers')
      .delete()
      .eq('platform', 'youtube');
    
    if (deleteError) {
      throw deleteError;
    }
    
    // Then insert the new data
    const { error: insertError } = await supabase
      .from('influencers')
      .insert(
        influencers.map(inf => ({
          ...inf,
          last_updated: new Date().toISOString()
        }))
      );
    
    if (insertError) {
      throw insertError;
    }
    
    console.log(`Successfully updated ${influencers.length} YouTube influencers`);
    return { success: true, count: influencers.length };
    
  } catch (err) {
    console.error('Failed to update YouTube influencers:', err);
    throw err;
  }
}

// Handler for the edge function
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const supabase = createSupabaseClient(req);
    
    // Update YouTube influencers
    const result = await updateYouTubeInfluencers(supabase);
    
    return new Response(
      JSON.stringify(result),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error in youtube-api function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
