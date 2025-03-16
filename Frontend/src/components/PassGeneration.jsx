import { useState, useEffect } from 'react';
import CryptoJs from 'crypto-js';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function PassGeneration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [desc, setDesc] = useState('');
  const [key, setKey] = useState('');
  const [file, setFile] = useState('');
  const [jsonData, setJsonData] = useState({
    username: '',
    pass: '',
    desc: '',
  });

  const encrypt = (msg, key) => {
    return CryptoJs.AES.encrypt(msg, key).toString();
  };

  const decrypt = (cipherText, key) => {
    const decryptMessage = CryptoJs.AES.decrypt(cipherText, key);
    return decryptMessage.toString(CryptoJs.enc.Utf8);
  };

  const convertToJson = (username, password, desc) => {
    setJsonData({ username, pass: password, desc });
    return jsonData;
  };

  // useEffect(() => {
  //   console.log(username, password, desc, key, file);
  // }, [username, password, desc, key, file]);
  return (
    <Tabs defaultValue="encrypt" className="w-[95%]">
      {/* <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="encrypt">Auto Generation</TabsTrigger>
        <TabsTrigger value="decrypt">Manuel Generation</TabsTrigger>
      </TabsList> */}
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
              <Input type="email" placeholder="Password" />
              <Button // onClick={() => {
                //   const cipherText = encrypt('hello guys', 'pass');
                //   console.log(cipherText);
                //   console.log(decrypt(cipherText, 'pass'));
                // }}
                type="submit"
              >
                Generate
              </Button>
            </div>
            <CardDescription>
              Password will automatically apply to the input(password) field
            </CardDescription>
          </CardContent>
          <CardFooter>
            <RadioGroup defaultValue="all" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text">Text</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="numbers" id="numbers" />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="special" id="special" />
                <Label htmlFor="special">Special Characters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">Use All</Label>
              </div>
            </RadioGroup>
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
