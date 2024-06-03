import { defineNuxtRouteMiddleware, useCookie, type CookieRef } from "nuxt/app";
import { useChallenges } from "../stores/challenges";
import type { Cookie } from "~/interfaces/Generic";

export default defineNuxtRouteMiddleware(() => {
  const cookie: CookieRef<Cookie> = useCookie('moveit')
  const { saveCookieData } = useChallenges();

  if (cookie.value) {
    saveCookieData(cookie.value);
  }
}) 