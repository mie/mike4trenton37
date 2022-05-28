type Nullable<T> = T | null

export interface Person {
  name: string;
  email: string;
  phoneNumber: string;
  office: Nullable<string>;
  manager: string;
  orgUnit: string;
  mainText: string;
  gitHub: Nullable<string>;
  twitter: Nullable<string>;
  stackOverflow: Nullable<string>;
  linkedIn: Nullable<string>;
  imagePortraitUrl: string;
  imageWallOfLeetUrl: string;
  highlighted: boolean;
  published: boolean;
}

export interface Filter {
	offices: string[];
	name_str: string;
}

export interface CheckedState {
	item: string;
	checked: boolean;
}