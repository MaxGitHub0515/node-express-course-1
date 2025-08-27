
// INTERFACES FOR MOCK DATA
export interface SuggestProjectName {
    _id: string;
    name: string;
    cuid: string,
}

export interface Stack {
  id: string;
  label: string;
}

// MOCK DATA

export const Suggestions: SuggestProjectName[] = [
    { _id: "1", name: "Project A", cuid: "54f4t4fdf45ds454fr" },
    { _id: "2", name: "Project B", cuid: "jfj53454fd343dgf4g" },
    { _id: "3", name: "Project C", cuid: "kcf3t4fdf45ds454fa" },
    { _id: "4", name: "Project D", cuid: "942ft4fdf45ds454fb" },
    { _id: "5", name: "Project E", cuid: "76f4t4fdf45ds454fc" },
]

export const stacksMock: Stack[] = [
  { id: "mern", label: "MERN" },
  { id: "mevn", label: "MEVN" },
  { id: "lamp", label: "LAMP" },
];
