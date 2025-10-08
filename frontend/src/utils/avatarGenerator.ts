// utils/avatarGenerator.ts
export type AvatarStyle = "initials" | "shapes" | "lorelei";

export function generateAvatarPlaceholder(
  username: string | undefined | null,
  style: AvatarStyle = "initials"
): string {
  if (!username) return "/assets/images/border-avatar.svg";

  const initials = getInitials(username);

  const styles: Record<AvatarStyle, string> = {
    initials: `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=0084ff&color=ffffff`,
    shapes: `https://api.dicebear.com/7.x/shapes/svg?seed=${username}`,
    lorelei: `https://api.dicebear.com/7.x/lorelei/svg?seed=${username}`,
  };

  return styles[style] || styles.initials;
}

function getInitials(username: string): string {
  if (!username) return "U";

  return username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}

export function getUserAvatar(
  user: { profileImage?: string; name?: string } | null | undefined,
  style: AvatarStyle = "initials"
): string {
  if (!user) return "/assets/images/border-avatar.svg";

  return user.profileImage || generateAvatarPlaceholder(user.name, style);
}
