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

export type ProductPrisma = {
  id: number;
  name: string;
  type: string;
  hlw: string;
  manufacturer: string[];
  oem_no: string[];
  ref_no: {
    brandList: string[],
    no_list: string[],
  };
  machine_model: string[];
  desc_app?: string;
  price?: string;
  cu_m3?: string;
}
