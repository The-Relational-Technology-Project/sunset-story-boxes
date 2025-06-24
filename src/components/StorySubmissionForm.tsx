
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
    <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-center">
          Share Your Story
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Story Title *
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your story a catchy title..."
            className="w-full"
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teaser" className="text-sm font-medium">
            One-line teaser *
          </Label>
          <Textarea
            id="teaser"
            value={teaser}
            onChange={(e) => setTeaser(e.target.value)}
            placeholder="A brief, intriguing description of your story..."
            className="w-full min-h-[80px] resize-none"
            maxLength={200}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact" className="text-sm font-medium">
            Contact Method
          </Label>
          <Input
            id="contact"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            placeholder="Email, phone, or preferred way to reach you"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Your Name (optional)
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="How would you like to be credited?"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="venue" className="text-sm font-medium">
            Choose a cozy spot to gather
          </Label>
          <Select value={venue} onValueChange={setVenue}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a venue for potential gatherings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Black Bird Bookstore & Café">Black Bird Bookstore & Café</SelectItem>
              <SelectItem value="Ortega Library Branch">Ortega Library Branch</SelectItem>
              <SelectItem value="Other, let's decide together">Other, let's decide together</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="sharing"
            checked={openToSharing}
            onCheckedChange={(checked) => setOpenToSharing(checked as boolean)}
          />
          <Label 
            htmlFor="sharing" 
            className="text-sm font-medium leading-tight cursor-pointer"
          >
            I'm open to sharing this story live if others are interested
          </Label>
        </div>

        <DialogFooter className="flex flex-col space-y-2 pt-4">
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit Story
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default StorySubmissionForm;
