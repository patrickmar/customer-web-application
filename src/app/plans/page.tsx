"use client";
import React, { Component } from "react";
import SavingsCard from "../components/Cards/Plans";
import Private2 from "../components/Layouts/Private2";
import Breadcrumb from "../components/Breadcrumbs";
import RightBar from "../components/RightBar";

interface IPlansProps {}

interface IPlansState {
  plans: IPlans[];
  mount: boolean;
}

interface IPlans {
  name: string;
  text: string;
  status: boolean;
  interestRate: number;
  color: string;
  bgColor: string;
}

class Plans extends Component<IPlansProps, IPlansState> {
  constructor(props: IPlansProps) {
    super(props);
    const packages = [
      {
        name: "Starter plan",
        text: "Lorem ipsum dolor sit amet consectetur. Egestas nunc sed sit sed.",
        status: true,
        interestRate: 6,
        color: "text-primary-400",
        bgColor: "bg-primary-25",
      },
      {
        name: "Basic plan",
        text: "Lorem ipsum dolor sit amet consectetur. Egestas nunc sed sit sed.",
        status: false,
        interestRate: 6,
        color: "secondary-700",
        bgColor: "secondary-100",
      },
      {
        name: "Premium plan",
        text: "Lorem ipsum dolor sit amet consectetur. Egestas nunc sed sit sed.",
        status: false,
        interestRate: 8,
        color: "tertiary-700",
        bgColor: "tertiary-100",
      },
      {
        name: "Target Savings",
        text: "Lorem ipsum dolor sit amet consectetur. Egestas nunc sed sit sed.",
        status: false,
        interestRate: 10,
        color: "success-700",
        bgColor: "success-100",
      },
    ];

    this.state = {
      mount: false,
      plans: packages,
    };
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  public render() {
    const { mount, plans } = this.state;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Saving Plans" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-[#E2E8F0] bg-white shadow-default dark:border-[2E3A47] dark:bg-[#24303F]">
                    <div className="border-b border-[#E2E8F0] py-4 px-7 dark:border-[#2E3A47]">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Plans
                      </h3>
                    </div>
                    <div className="p-7">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                        {plans.map((plan: IPlans, i: number) => (
                          <SavingsCard
                            key={i}
                            name={plan.name}
                            text={plan.text}
                            status={plan.status}
                            color={plan.color}
                            bgColor={plan.bgColor}
                            interestRate={plan.interestRate}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <RightBar />
              </div>
            </div>
          </Private2>
        )}
      </>
    );
  }
}

export default Plans;
