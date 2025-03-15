import { useState, useEffect } from 'react';
import { encryptMessage, decryptMessage } from '@/lib/dataManipulation';
import {
  getBase64FromFile,
  encodeMessageInImage,
  decodeMessageFromImage,
  handleSaveImage,
} from '@/lib/steg';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [hiddenFile, setHiddenFile] = useState(null);

  const handleEncodeImage = async (username, password, desc, selectedFile) => {
    try {
      const base64Image = await getBase64FromFile(selectedFile);
      const encodedImage = await encodeMessageInImage(
        base64Image,
        desc,
        'pass'
      );
      setHiddenFile(encodedImage);
      console.log(encodedImage);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDecodeImage = async () => {
    try {
      const base64Image = await getBase64FromFile(hiddenFile);
      const decodedMessage = await decodeMessageFromImage(base64Image, 'pass');
      console.log(decodedMessage);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  // console.log(username, password, desc, selectedFile);
  // }, [username, password, desc, selectedFile]);
  return (
    <Tabs defaultValue="encrypt" className="w-[95%]">
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
              <Input
                id="username"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Input
                id="password"
                value={password}
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Textarea
                id="desc"
                value={desc}
                placeholder="Type your message here."
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Image for store Data.</Label>
              <Input
                id="file"
                type="file"
                placeholder="Encryption key"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                handleEncodeImage(username, password, desc, selectedFile);
              }}
            >
              Make Secure
            </Button>
            <Button onClick={() => handleSaveImage(hiddenFile)}>save</Button>
            <img src={hiddenFile} alt="" />
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
            <Button onClick={handleDecodeImage}>Make Public</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
