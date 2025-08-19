import { graphql } from 'relay-runtime';
import { readFragment } from 'relay-runtime/lib/store/ResolverFragments';
import type { isRecentlyLogin_user$key } from './__generated__/isRecentlyLogin_user.graphql';

/**
 * @RelayResolver User.isRecentlyLogin(period: Int): Boolean
 * @rootFragment isRecentlyLogin_user
 *
 * ユーザーが最近ログインしたかどうか
 */
export const isRecentlyLogin = (
  key: isRecentlyLogin_user$key,
  args: { period?: number }
): boolean | undefined => {
  const node = readFragment(
    graphql`
      fragment isRecentlyLogin_user on User {
        lastLoginAt
      }
    `,
    key
  );

  // lastLoginAtが存在しない場合は何も返さない
  if (!node.lastLoginAt) {
    return undefined;
  }

  const lastLoginDate = new Date(node.lastLoginAt);
  const now = new Date();
  const period = args.period ?? 7;
  const periodTime = period * 24 * 60 * 60 * 1000;

  // 差分を検証
  return now.getTime() - lastLoginDate.getTime() <= periodTime;
};
