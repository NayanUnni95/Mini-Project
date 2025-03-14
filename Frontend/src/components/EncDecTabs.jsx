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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function EncDecTabs() {
  return (
    <Tabs defaultValue="encrypt" className="w-[80%]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="encrypt">Encryption</TabsTrigger>
        <TabsTrigger value="decrypt">Decryption</TabsTrigger>
      </TabsList>
      <TabsContent value="encrypt">
        <Card>
          <CardHeader>
            <CardTitle>Encryption</CardTitle>
            <CardDescription>
              Encryption ensures that sensitive information remains confidential
              and secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input id="username" placeholder="username" />
            </div>
            <div className="space-y-1">
              <Input id="password" type="password" placeholder="password" />
            </div>
            <div className="space-y-1">
              <Textarea id="desc" placeholder="Type your message here." />
            </div>
            <div className="space-y-1">
              <Input id="key" placeholder="Encryption key" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Image for store Data.</Label>
              <Input id="file" type="file" placeholder="Encryption key" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Make Secure</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="decrypt">
        <Card>
          <CardHeader>
            <CardTitle>Decryption</CardTitle>
            <CardDescription>
              Decryption requires a specific key that corresponds to the key
              used for encryption. Without the correct key, decryption is
              impossible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input id="key" placeholder="Encryption key" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Image for store Data.</Label>
              <Input id="file" type="file" placeholder="Encryption key" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Make Public</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
