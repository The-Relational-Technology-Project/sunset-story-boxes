
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import StorySubmissionForm from "@/components/StorySubmissionForm";
import InterestAlertForm from "@/components/InterestAlertForm";

interface Story {
  id: number;
  title: string;
  teaser: string;
  contactMethod?: string;
  name?: string;
  openToSharing?: boolean;
  venue?: string;
  interestCount: number;
}

const initialStories: Story[] = [
  {
    id: 1,
    title: "The Fog Cat of 48th Avenue",
    teaser: "Every morning, Mrs. Chen spots the same gray cat emerging from the mist...",
    venue: "Black Bird Bookstore & Café",
    interestCount: 7
  },
  {
    id: 2,
    title: "Sunset Surfers at Dawn",
    teaser: "Before the neighborhood wakes, three friends chase waves at Ocean Beach...",
    interestCount: 2
  },
  {
    id: 3,
    title: "The Corner Store Angel",
    teaser: "When the Ahmad family opened their market, they never expected to become the neighborhood's guardian angels...",
    venue: "Ortega Library Branch",
    interestCount: 5
  },
  {
    id: 4,
    title: "Love Letters in the Sand",
    teaser: "Someone has been writing messages in the sand at Noriega Beach for 30 years...",
    venue: "Black Bird Bookstore & Café",
    interestCount: 9
  },
  {
    id: 5,
    title: "The Mystery of the Singing Stairs",
    teaser: "Every Tuesday at 3 PM, beautiful music echoes from the Moraga Steps...",
    interestCount: 1
  },
  {
    id: 6,
    title: "Garden Wisdom from Judah Street",
    teaser: "Maria's front yard garden has fed half the block for three decades...",
    interestCount: 3
  }
];

const Index = () => {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);

  const handleStorySubmit = (storyData: {
    title: string;
    teaser: string;
    contactMethod: string;
    name: string;
    openToSharing: boolean;
    venue: string;
  }) => {
    const newStory: Story = {
      id: Math.max(...stories.map(s => s.id)) + 1,
      ...storyData,
      interestCount: 0
    };
    
    setStories(prevStories => [newStory, ...prevStories]);
    setIsDialogOpen(false);
  };

  const handleInterestClick = (storyId: number) => {
    setStories(prevStories => 
      prevStories.map(story => 
        story.id === storyId 
          ? { ...story, interestCount: story.interestCount + 1 }
          : story
      )
    );
    console.log(`Interest shown for story ID: ${storyId}`);
    
    // Open alert signup
    setSelectedStoryId(storyId);
    setAlertDialogOpen(true);
  };

  const handleAlertSubmit = (alertData: { contactMethod: string; contact: string }) => {
    console.log(`Alert signup for story ${selectedStoryId}:`, alertData);
    setAlertDialogOpen(false);
    setSelectedStoryId(null);
  };

  return (
    <div className="min-h-screen bg-background fog-texture">
      {/* Header */}
      <header className="sunset-gradient border-b border-border/50 px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-3 cozy-text">
            Little Free Neighborhood Stories
          </h1>
          <p className="text-muted-foreground text-base font-medium">
            Stories from the Outer Sunset community
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        {/* Submit Story Button */}
        <div className="mb-10">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="w-full handmade-button organic-rounded bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-5 text-lg shadow-lg"
              >
                ✨ Submit a Story
              </Button>
            </DialogTrigger>
            <StorySubmissionForm 
              onSubmit={handleStorySubmit}
              onClose={() => setIsDialogOpen(false)}
            />
          </Dialog>
        </div>

        {/* Stories Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground mb-6 cozy-text">
            Recent Stories
          </h2>
          
          {stories.map((story, index) => (
            <Card 
              key={story.id} 
              className={`story-card organic-rounded bg-card border shadow-md ${
                story.interestCount >= 5 ? 'border-green-400 bg-green-50/80' : 'border-border/60'
              }`}
            >
              {story.interestCount >= 5 && (
                <div className="bg-gradient-to-r from-green-300 to-green-400 text-green-900 text-center py-3 px-4 text-sm font-bold organic-rounded rounded-b-none">
                  🌟 Event forming soon!
                  {story.venue && (
                    <div className="text-xs mt-1 font-medium">
                      📍 Gathering at {story.venue}
                    </div>
                  )}
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-foreground leading-snug cozy-text">
                  {story.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed font-medium">
                  {story.teaser}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`w-full organic-rounded font-semibold transition-all duration-200 ${
                    story.interestCount >= 5 
                      ? 'border-green-400 text-green-800 hover:bg-green-100 bg-green-50' 
                      : 'border-blue-300 text-blue-700 hover:bg-blue-50 bg-blue-25'
                  }`}
                  onClick={() => handleInterestClick(story.id)}
                >
                  💫 I want to hear this!
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border/50 mt-16 px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-muted-foreground font-medium cozy-text">
            🌊 Connected to Little Free Libraries in the Outer Sunset
          </p>
        </div>
      </footer>

      {/* Alert Dialog */}
      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <InterestAlertForm 
          onSubmit={handleAlertSubmit}
          onClose={() => {
            setAlertDialogOpen(false);
            setSelectedStoryId(null);
          }}
        />
      </Dialog>
    </div>
  );
};

export default Index;
