export interface InformationProps {
  _key: string;
  _type: string;
  infos: Info[];
  title: string;
}

export interface Info {
  _key: string;
  _type: string;
  type: string;
  value: any;
}
