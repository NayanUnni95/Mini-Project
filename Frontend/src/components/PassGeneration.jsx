import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export function PassGeneration() {
  const [selectedValue, setSelectedValue] = useState('all');
  const [finalPassword, setFinalPassword] = useState('');
  useEffect(() => {
    console.log('Selected Value:', selectedValue);
  }, [selectedValue]);

  const generateTextPassword = (length) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return generateRandomString(charset, length);
  };

  const generateNumberPassword = (length) => {
    const charset = '0123456789';
    return generateRandomString(charset, length);
  };

  const generateSpecialCharPassword = (length) => {
    const charset = '!@#$%^&*()_+[]{}|;:,.<>?';
    return generateRandomString(charset, length);
  };

  const generateMixedPassword = (length) => {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    return generateRandomString(charset, length);
  };

  const generateRandomString = (charset, length) => {
    let password = '';
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      password += charset[randomValues[i] % charset.length];
    }

    return password;
  };

  const handleGenPass = () => {
    let finalPassword = '';
    if (selectedValue === 'text') {
      finalPassword = generateTextPassword(20);
    } else if (selectedValue === 'numbers') {
      finalPassword = generateNumberPassword(20);
    } else if (selectedValue === 'special') {
      finalPassword = generateSpecialCharPassword(20);
    } else if (selectedValue === 'all') {
      finalPassword = generateMixedPassword(20);
    }
    console.log('Hashed Password:', finalPassword);
    setFinalPassword(finalPassword);
  };

  return (
    <Tabs defaultValue="encrypt" className="w-[95%]">
      <TabsContent value="encrypt">
        <Card>
          <CardHeader>
            <CardTitle>Generate Password</CardTitle>
            <CardDescription>
              Making manuel password would be less secure than auto generation.
              Use automatic password generator for more security. Keep your data
              secure...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Password" value={finalPassword} />
              <Button type="submit" onClick={handleGenPass}>
                Generate
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  navigator.clipboard.writeText(finalPassword);
                  toast('Password copied to clipboard');
                }}
              >
                <Copy />
              </Button>
            </div>
            <CardDescription>
              Password will automatically apply to the input(password) field
            </CardDescription>
          </CardContent>
          <CardFooter>
            <RadioGroup defaultValue="all" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="text"
                  id="text"
                  onClick={(e) => setSelectedValue(e.target.value)}
                />
                <Label htmlFor="text">Text</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="numbers"
                  id="numbers"
                  onClick={(e) => setSelectedValue(e.target.value)}
                />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="special"
                  id="special"
                  onClick={(e) => setSelectedValue(e.target.value)}
                />
                <Label htmlFor="special">Special Characters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="all"
                  id="all"
                  onClick={(e) => setSelectedValue(e.target.value)}
                />
                <Label htmlFor="all">Use All</Label>
              </div>
            </RadioGroup>
          </CardFooter>
        </Card>
        <Toaster />
      </TabsContent>
    </Tabs>
  );
}
