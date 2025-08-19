import { graphql, useFragment } from 'react-relay';
import type { UserFragment$key } from './__generated__/UserFragment.graphql';

type Props = {
  user: UserFragment$key;
}

export const User = ({ user }: Props) => {
  const data = useFragment(
    graphql`
      fragment UserFragment on User {
        lastLoginAt
        isRecentlyLogin(period: 7)
      }
    `,
    user
  )

  console.log(data);

  return (
    <div>
      {!!data.isRecentlyLogin && <p>最近ログインしました</p>}
      <p>最終ログイン日: {data.lastLoginAt ?? '-'}</p>
    </div>
  )
}
