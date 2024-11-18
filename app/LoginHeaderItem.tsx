"use client";

import { HeaderQuickAccessItem } from "@codegouvfr/react-dsfr/Header";

type Props = {
  id?: string;
};

export function LoginHeaderItem(props: Props) {
  const { id } = props;

  return (
    <HeaderQuickAccessItem
      id={id}
      quickAccessItem={{
        iconId: "ri-account-box-line",
        text: "Se connecter",
        buttonProps: {
          onClick: () => {
            alert("TODO: implement login");
          },
        },
      }}
    />
  );
}
