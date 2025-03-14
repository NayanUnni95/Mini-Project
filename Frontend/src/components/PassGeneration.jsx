import { useState, useEffect } from 'react';
import CryptoJs from 'crypto-js';
// import stegnography from 'ste'
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

  useEffect(() => {
    console.log(username, password, desc, key, file);
  }, [username, password, desc, key, file]);
  return (
    <Tabs defaultValue="encrypt" className="w-[95%]">
      {/* <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="encrypt">Auto Generation</TabsTrigger>
        <TabsTrigger value="decrypt">Manuel Generation</TabsTrigger>
      </TabsList> */}
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
            {/* <div className="space-y-1">
              <Input
                id="username"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div> */}
            {/* <div className="space-y-1">
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
            </div> */}
            {/* <div className="space-y-1">
              <Input
                id="key"
                value={key}
                placeholder="Encryption key"
                onChange={(e) => setKey(e.target.value)}
              />
            </div> */}
            {/* <div className="space-y-1">
              <Label htmlFor="name">Image for store Data.</Label>
              <Input
                id="file"
                value={file}
                type="file"
                placeholder="Encryption key"
                onChange={(e) => setFile(e.target.value)}
              />
            </div> */}
          </CardContent>
          <CardFooter>
            <Button
            // onClick={() => {
            //   const cipherText = encrypt('hello guys', 'pass');
            //   console.log(cipherText);
            //   console.log(decrypt(cipherText, 'pass'));
            // }}
            >
              Generate
            </Button>
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
