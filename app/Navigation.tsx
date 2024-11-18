"use client";

import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { useSelectedLayoutSegment } from "next/navigation";
import { useCallback, useMemo } from "react";

type Route = {
  text: string;
  href: string;
  segment: string | null;
};

type NavigationItem = {
  text: string;
  linkProps: {
    href: string;
    className?: string;
  };
  isActive: boolean;
};

export function Navigation() {
  const segment = useSelectedLayoutSegment();

  const routes: Route[] = useMemo(
    () => [
      {
        text: "Accueil",
        href: "/",
        segment: null,
      },
      {
        text: "Services",
        href: "/services",
        segment: "services",
      },
      {
        text: "À propos",
        href: "/about",
        segment: "about",
      },
      {
        text: "Contact",
        href: "/contact",
        segment: "contact",
      },
    ],
    []
  );

  const isActiveLink = useCallback(
    (routeSegment: string | null): boolean => {
      return segment === routeSegment;
    },
    [segment]
  );

  const navigationItems: NavigationItem[] = useMemo(() => {
    return routes.map((route) => ({
      text: route.text,
      linkProps: {
        href: route.href,
        className: isActiveLink(route.segment) ? "active" : "",
      },
      isActive: isActiveLink(route.segment),
    }));
  }, [routes, isActiveLink]);

  return (
    <nav role="navigation" aria-label="Navigation principale">
      <MainNavigation
        items={navigationItems}
        className="navigation-principale"
      />
    </nav>
  );
}
