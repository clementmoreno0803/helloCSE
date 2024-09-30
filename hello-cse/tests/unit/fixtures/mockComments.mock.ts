import { CommentForm } from "@/models/commentInterface";

export const mockComments: CommentForm[] = [
  {
    profilPicture: 'https://thispersondoesnotexist.com/',
    name: 'User1',
    commentPart: 'This is a comment.',
    note: 8,
    dateCreation: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    profilPicture: 'https://thispersondoesnotexist.com/',
    name: 'User2',
    commentPart: 'This is another comment.',
    note: 9,
    dateCreation: new Date(Date.now() - 120 * 60000).toISOString(),
  },
];