
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import StorySubmissionForm from "@/components/StorySubmissionForm";

interface Story {
  id: number;
  title: string;
  teaser: string;
  contactMethod?: string;
  name?: string;
  openToSharing?: boolean;
}

const initialStories: Story[] = [
  {
    id: 1,
    title: "The Fog Cat of 48th Avenue",
    teaser: "Every morning, Mrs. Chen spots the same gray cat emerging from the mist..."
  },
  {
    id: 2,
    title: "Sunset Surfers at Dawn",
    teaser: "Before the neighborhood wakes, three friends chase waves at Ocean Beach..."
  },
  {
    id: 3,
    title: "The Corner Store Angel",
    teaser: "When the Ahmad family opened their market, they never expected to become the neighborhood's guardian angels..."
  },
  {
    id: 4,
    title: "Love Letters in the Sand",
    teaser: "Someone has been writing messages in the sand at Noriega Beach for 30 years..."
  },
  {
    id: 5,
    title: "The Mystery of the Singing Stairs",
    teaser: "Every Tuesday at 3 PM, beautiful music echoes from the Moraga Steps..."
  },
  {
    id: 6,
    title: "Garden Wisdom from Judah Street",
    teaser: "Maria's front yard garden has fed half the block for three decades..."
  }
];

const Index = () => {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleStorySubmit = (storyData: {
    title: string;
    teaser: string;
    contactMethod: string;
    name: string;
    openToSharing: boolean;
  }) => {
    const newStory: Story = {
      id: Math.max(...stories.map(s => s.id)) + 1,
      ...storyData
    };
    
    setStories(prevStories => [newStory, ...prevStories]);
    setIsDialogOpen(false);
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
            <Card key={story.id} className="bg-white border shadow-sm">
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
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => console.log(`Read story: ${story.title}`)}
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
    </div>
  );
};

export default Index;
