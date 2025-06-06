export type PageParam = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export type RootLayoutParam = Readonly<{
  children: React.ReactNode;
}>

export type CultureContent = {
  zh: {
    backgroundImage?: string;
    textContent?: string;
    imageContent?: string;
  },
  en: {
    backgroundImage?: string;
    textContent?: string;
    imageContent?: string;
  }
}

export type MainPrisma = {
  banner: string;
}

export type CulturePrisma = {
  data: CultureContent;
}

export type CategoryPrisma = {
  types: string[];
  types_en: string[];
}
