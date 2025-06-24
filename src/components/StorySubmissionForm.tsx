
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface StorySubmissionFormProps {
  onSubmit: (story: {
    title: string;
    teaser: string;
    contactMethod: string;
    name: string;
    openToSharing: boolean;
    venue: string;
  }) => void;
  onClose: () => void;
}

const StorySubmissionForm = ({ onSubmit, onClose }: StorySubmissionFormProps) => {
  const [title, setTitle] = useState('');
  const [teaser, setTeaser] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [name, setName] = useState('');
  const [openToSharing, setOpenToSharing] = useState(false);
  const [venue, setVenue] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !teaser.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Title and teaser are required to submit your story.",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      title: title.trim(),
      teaser: teaser.trim(),
      contactMethod: contactMethod.trim(),
      name: name.trim(),
      openToSharing,
      venue
    });

    toast({
      title: "Story submitted!",
      description: "Thank you for sharing your neighborhood story."
    });

    onClose();
  };

  return (
    <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto organic-rounded bg-card">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center cozy-text text-foreground">
          ✨ Share Your Story
        </DialogTitle>
        <p className="text-sm text-muted-foreground text-center mt-2 font-medium">
          Help weave the fabric of our neighborhood
        </p>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-bold text-foreground">
            Story Title *
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your story a catchy title..."
            className="w-full organic-rounded font-medium"
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teaser" className="text-sm font-bold text-foreground">
            One-line teaser *
          </Label>
          <Textarea
            id="teaser"
            value={teaser}
            onChange={(e) => setTeaser(e.target.value)}
            placeholder="A brief, intriguing description of your story..."
            className="w-full min-h-[80px] resize-none organic-rounded font-medium"
            maxLength={200}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact" className="text-sm font-bold text-foreground">
            Contact Method
          </Label>
          <Input
            id="contact"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            placeholder="Email, phone, or preferred way to reach you"
            className="w-full organic-rounded font-medium"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-bold text-foreground">
            Your Name (optional)
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="How would you like to be credited?"
            className="w-full organic-rounded font-medium"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="venue" className="text-sm font-bold text-foreground">
            🏠 Choose a cozy spot to gather
          </Label>
          <Select value={venue} onValueChange={setVenue}>
            <SelectTrigger className="w-full organic-rounded font-medium">
              <SelectValue placeholder="Select a venue for potential gatherings" />
            </SelectTrigger>
            <SelectContent className="organic-rounded">
              <SelectItem value="Black Bird Bookstore & Café">☕ Black Bird Bookstore & Café</SelectItem>
              <SelectItem value="Ortega Library Branch">📚 Ortega Library Branch</SelectItem>
              <SelectItem value="Other, let's decide together">🤝 Other, let's decide together</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-3 pt-3">
          <Checkbox
            id="sharing"
            checked={openToSharing}
            onCheckedChange={(checked) => setOpenToSharing(checked as boolean)}
            className="organic-rounded"
          />
          <Label 
            htmlFor="sharing" 
            className="text-sm font-semibold leading-tight cursor-pointer text-foreground"
          >
            🎤 I'm open to sharing this story live if others are interested
          </Label>
        </div>

        <DialogFooter className="flex flex-col space-y-3 pt-6">
          <Button 
            type="submit" 
            className="w-full handmade-button organic-rounded bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3"
          >
            🌟 Submit Story
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="w-full organic-rounded font-semibold"
          >
            Maybe later
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default StorySubmissionForm;
