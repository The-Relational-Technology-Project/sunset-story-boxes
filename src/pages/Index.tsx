
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b px-4 py-6">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Little Free Neighborhood Stories
          </h1>
          <p className="text-muted-foreground text-sm">
            Stories from the Outer Sunset community
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Submit Story Button */}
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4"
              >
                Submit a Story
              </Button>
            </DialogTrigger>
            <StorySubmissionForm 
              onSubmit={handleStorySubmit}
              onClose={() => setIsDialogOpen(false)}
            />
          </Dialog>
        </div>

        {/* Stories Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Recent Stories
          </h2>
          
          {stories.map((story) => (
            <Card 
              key={story.id} 
              className={`bg-white border shadow-sm ${
                story.interestCount >= 5 ? 'border-green-300 bg-green-50' : ''
              }`}
            >
              {story.interestCount >= 5 && (
                <div className="bg-green-200 text-green-800 text-center py-2 px-4 text-sm font-medium rounded-t-lg">
                  🌟 Event forming soon!
                  {story.venue && (
                    <div className="text-xs mt-1">
                      📍 Gathering at {story.venue}
                    </div>
                  )}
                </div>
              )}
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-foreground leading-tight">
                  {story.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {story.teaser}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`w-full ${
                    story.interestCount >= 5 
                      ? 'border-green-300 text-green-700 hover:bg-green-100' 
                      : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                  }`}
                  onClick={() => handleInterestClick(story.id)}
                >
                  I want to hear this!
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12 px-4 py-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Connected to Little Free Libraries in the Outer Sunset
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
