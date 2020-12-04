interface ZipcloudResponse {
  message: string;
  results: ZipcloudResponseResult[];
  status: number;
}

interface ZipcloudResponseResult {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
  prefcode: string;
  zipcode: string;
}
