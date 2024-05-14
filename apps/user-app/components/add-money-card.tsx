"use client";

import React, { useState } from "react";
import Card from "@repo/ui/card";
import TextInput from "@repo/ui/text-input";
import Select from "@repo/ui/select";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "http://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];
const AddMoneyCard = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState("0");
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(val) => {
            setValue(val);
          }}
        />
        <div className="py-4 text-left">Bank</div>

        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />

        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(provider, Number(value));
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AddMoneyCard;
