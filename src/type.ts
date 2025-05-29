export type PageParam = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export type RootLayoutParam = Readonly<{
  children: React.ReactNode;
}>
