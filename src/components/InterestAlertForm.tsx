
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface InterestAlertFormProps {
  onSubmit: (alertData: {
    contactMethod: string;
    contact: string;
  }) => void;
  onClose: () => void;
}

const InterestAlertForm = ({ onSubmit, onClose }: InterestAlertFormProps) => {
  const [contactMethod, setContactMethod] = useState('');
  const [contact, setContact] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactMethod || !contact.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "We need your contact method and details to send you alerts.",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      contactMethod,
      contact: contact.trim()
    });

    toast({
      title: "You're all set!",
      description: "We'll let you know when this story gathering is ready."
    });

    onClose();
  };

  return (
    <DialogContent className="max-w-md mx-auto organic-rounded bg-card">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center cozy-text text-foreground">
          📬 Get Story Alerts
        </DialogTitle>
        <p className="text-sm text-muted-foreground text-center mt-3 font-medium">
          We'll let you know when this story gathering is happening!
        </p>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="method" className="text-sm font-bold text-foreground">
            How should we contact you?
          </Label>
          <Select value={contactMethod} onValueChange={setContactMethod}>
            <SelectTrigger className="w-full organic-rounded font-medium">
              <SelectValue placeholder="Choose your preferred contact method" />
            </SelectTrigger>
            <SelectContent className="organic-rounded">
              <SelectItem value="email">📧 Email</SelectItem>
              <SelectItem value="text">📱 Text</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact" className="text-sm font-bold text-foreground">
            {contactMethod === 'email' ? '📧 Email Address' : 
             contactMethod === 'text' ? '📱 Phone Number' : 'Contact Info'}
          </Label>
          <Input
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={
              contactMethod === 'email' ? 'your@email.com' :
              contactMethod === 'text' ? '(555) 123-4567' :
              'Enter your contact info'
            }
            type={contactMethod === 'email' ? 'email' : 'text'}
            className="w-full organic-rounded font-medium"
          />
        </div>

        <DialogFooter className="flex flex-col space-y-3 pt-6">
          <Button 
            type="submit" 
            className="w-full handmade-button organic-rounded bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3"
          >
            🌟 Sign me up!
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

export default InterestAlertForm;
