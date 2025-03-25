import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Shield, Key, History, Trash2 } from "lucide-react";

export const SecuritySettings = () => {
  const { toast } = useToast();
  const { user, updatePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setShowPasswordForm(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement 2FA setup/removal
      setTwoFactorEnabled(!twoFactorEnabled);
      toast({
        title: "Success",
        description: `Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update two-factor authentication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Implement account deletion
      toast({
        title: "Success",
        description: "Account deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent>
          {showPasswordForm ? (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-muted-foreground" />
                <span>Change your password</span>
              </div>
              <Button onClick={() => setShowPasswordForm(true)}>
                Change Password
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>Add an extra layer of security to your account</span>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <span>View your recent login activity</span>
            </div>
            <Button variant="outline">
              View History
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              <span>Delete your account</span>
            </div>
            <Button
              variant="destructive"
              onClick={handleAccountDeletion}
              disabled={isLoading}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 