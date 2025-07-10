"use client";
import Private2 from "../components/Layouts/Private2";
import Breadcrumb from "../components/Breadcrumbs";
import { Component } from "react";

export interface IReferralsProps {}

export interface IReferralsState {}

class Referrals extends Component<IReferralsProps, IReferralsState> {
  constructor(props: IReferralsProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <Private2>
        <div className="mx-auto max-w-270">
          <Breadcrumb pageName="Settings" />
          Settings Page
        </div>
      </Private2>
    );
  }
}

export default Referrals;
