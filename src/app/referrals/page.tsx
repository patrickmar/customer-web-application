"use client";

import React from "react";
import Private2 from "../components/Layouts/Private2";
import Breadcrumb from "../components/Breadcrumbs";

const Referrals = () => {
  return (
    <Private2>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Referrals" />
        Referral Page
      </div>
    </Private2>
  );
};

export default Referrals;
