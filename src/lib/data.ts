export type Activity = {
  skill: string;
  tokenId: string;
  status: 'Verified' | 'Pending' | 'Minted';
  date: string;
};

export const recentActivities: Activity[] = [
  { skill: 'React Advanced Hooks', tokenId: '8432', status: 'Verified', date: '2023-10-26' },
  { skill: 'Solidity Smart Contracts', tokenId: '8431', status: 'Verified', date: '2023-10-25' },
  { skill: 'Next.js App Router', tokenId: '9512', status: 'Pending', date: '2023-10-24' },
  { skill: 'Tailwind CSS Mastery', tokenId: '7234', status: 'Minted', date: '2023-10-22' },
  { skill: 'TypeScript for Pros', tokenId: '6875', status: 'Verified', date: '2023-10-20' },
  { skill: 'GraphQL API Design', tokenId: '5541', status: 'Pending', date: '2023-10-19' },
];

export type Verification = {
  skill: string;
  developer: string;
  tokenId: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  date: string;
};

export const verificationData: Verification[] = [
  {
    skill: 'React Advanced Hooks',
    developer: '0x23aB...89FF',
    tokenId: '8432',
    status: 'Verified',
    date: '2023-10-26',
  },
  {
    skill: 'Next.js App Router',
    developer: '0x23aB...89FF',
    tokenId: '9512',
    status: 'Pending',
    date: '2023-10-24',
  },
  {
    skill: 'GraphQL API Design',
    developer: '0xAbCd...c1dE',
    tokenId: '5541',
    status: 'Pending',
    date: '2023-10-23',
  },
  {
    skill: 'Ethers.js Integration',
    developer: '0xAbCd...c1dE',
    tokenId: '3321',
    status: 'Rejected',
    date: '2023-10-22',
  },
  {
    skill: 'Web3 Security',
    developer: '0xFaBc...b3eD',
    tokenId: '9982',
    status: 'Verified',
    date: '2023-10-21',
  },
];
