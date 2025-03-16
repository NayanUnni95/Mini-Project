import { useContext, useState } from 'react';
import {
  encryptMessage,
  decryptMessage,
  cleanUpData,
  convertToJson,
} from '@/lib/dataManipulation';
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
import { UserDataContext } from '@/context/UserInfoContext';
import { KeyRound, FileLock, ImageDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { BarLoader, PulseLoader } from 'react-spinners';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export function EncDecTabs() {
  const [loadingEnc, setLoadingEnc] = useState(false);
  const [loadingDec, setLoadingDec] = useState(false);
  const [decryptedData, setDecryptedData] = useState(null);
  const {
    username,
    setUsername,
    password,
    setPassword,
    url,
    setUrl,
    desc,
    setDesc,
    selectedFile,
    setSelectedFile,
    hiddenFile,
    setHiddenFile,
    decryptFile,
    setDecryptFile,
    imgSrc,
    setImgSrc,
  } = useContext(UserDataContext);

  const handleEncodeImage = async (
    username,
    password,
    url,
    desc,
    selectedFile
  ) => {
    setLoadingEnc(true);
    const stringData = cleanUpData(username, password, url, desc);
    try {
      if (
        typeof selectedFile === 'string' &&
        selectedFile.startsWith('data:')
      ) {
        const encodedImage = await encodeMessageInImage(
          selectedFile,
          stringData,
          'pass'
        );
        setHiddenFile(encodedImage);
      } else {
        const base64Image = await getBase64FromFile(selectedFile);
        const encodedImage = await encodeMessageInImage(
          base64Image,
          stringData,
          'pass'
        );
        setHiddenFile(encodedImage);
        console.log(encodedImage);
        toast('Encryption Successfully Completed...');
        setLoadingEnc(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDecodeImage = async () => {
    setLoadingDec(true);
    try {
      const base64Image = await getBase64FromFile(decryptFile);
      const decodedMessage = await decodeMessageFromImage(base64Image, 'pass');
      // console.log(convertToJson(decodedMessage));
      setDecryptedData(convertToJson(decodedMessage));
      console.log(decryptedData);

      setLoadingDec(false);
      toast('Decryption Successfully Completed...');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Tabs defaultValue="encrypt" className="w-[95%]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="encrypt">Encryption</TabsTrigger>
        <TabsTrigger value="decrypt">Decryption</TabsTrigger>
      </TabsList>
      <TabsContent value="encrypt">
        <Card className="w-full">
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
              <Input
                id="url"
                value={url}
                placeholder="url"
                onChange={(e) => setUrl(e.target.value)}
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
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => {
                  handleImageChange(e);
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="w-full flex items-center justify-evenly">
            <Button
              onClick={() => {
                // console.log(cleanUpData(username, password, url, desc));
                handleEncodeImage(username, password, url, desc, selectedFile);
              }}
            >
              {!loadingEnc ? (
                <>
                  Make Secure <FileLock />
                </>
              ) : (
                <BarLoader color="#fff" loading={true} />
              )}
            </Button>
            <Button onClick={() => handleSaveImage(hiddenFile)}>
              Save Image
              <ImageDown />
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
              <Input
                id="file"
                type="file"
                placeholder="Encryption key"
                onChange={(e) => {
                  setDecryptFile(e.target.files[0]);
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDecodeImage}>
              {!loadingDec ? (
                <>
                  Make Public <KeyRound />
                </>
              ) : (
                <PulseLoader color="#fff" loading={true} size={10} />
              )}
            </Button>
          </CardFooter>
        </Card>
        <Card className="mt-[1rem]">
          <CardHeader>
            <CardTitle>Decrypted Data </CardTitle>
          </CardHeader>
          <CardContent className=" grid grid-cols-2">
            <div className="m-[5px]">
              {decryptedData ? (
                <Input
                  type="text"
                  // id="username"
                  value={decryptedData.username}
                  // placeholder="username"
                  onClick={console.log('Copied')}
                  disabled
                />
              ) : (
                <Skeleton className="h-4 w-[200px]" />
              )}
            </div>
            <div className="m-[5px]">
              {decryptedData ? (
                <Input
                  type="password"
                  // id="username"
                  value={decryptedData.password}
                  // placeholder="password"
                  onClick={console.log('Copied')}
                  disabled
                />
              ) : (
                <Skeleton className="h-4 w-[200px]" />
              )}
            </div>
            <div className="m-[5px]">
              {decryptedData ? (
                <Input
                  type="text"
                  // id="username"
                  value={decryptedData.url}
                  // placeholder="username"
                  onClick={console.log('Copied')}
                  disabled
                />
              ) : (
                <Skeleton className="h-4 w-[200px]" />
              )}
            </div>
            <div className="m-[5px]">
              {decryptedData ? (
                <Input
                  type="text"
                  // id="username"
                  value={decryptedData.desc}
                  // placeholder="username"
                  onClick={console.log('Copied')}
                  disabled
                />
              ) : (
                <Skeleton className="h-4 w-[200px]" />
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <Toaster />
    </Tabs>
  );
}
