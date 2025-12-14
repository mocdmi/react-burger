export type TDescription = {
  path: string;
  description: string;
};

export type TPage = {
  to: string;
  name: string;
};

export type TSidebarProps = {
  pages: TPage[];
  descriptions: TDescription[];
};
