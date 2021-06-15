import seattleBudgetData, { Department, Program, Expense } from "../src";

describe("Operational Budget specification", () => {
  it("Provides data", async () => {
    await seattleBudgetData.then((data: any) => {
      expect(data).toBeTruthy();
    });
  });

  it("Has expected operational_budget structure", async () => {
    await seattleBudgetData.then((data: any) => {
      const budget2019 = data["2019"];
      expect(budget2019).toBeUndefined();

      const budget2020 = data["2020"];

      expect(budget2020.name).toEqual("2020");
      expect(budget2020.approvedAmount).toEqual(10350.5);
      expect(budget2020.type).toEqual("operational_budget");
      expect(budget2020.childType).toEqual("services");
      expect(budget2020.services).toBeTruthy();
    });
  });

  it("Has expected service structure", async () => {
    await seattleBudgetData.then((data: any) => {
      const services = data["2020"].services;

      expect(services).toBeTruthy();
      expect(Object.keys(services).length).toEqual(3);

      const neighborhoods = services["Neighborhoods & Development"];
      expect(neighborhoods).toBeTruthy();
      expect(neighborhoods.name).toEqual("Neighborhoods & Development");
      expect(neighborhoods.approvedAmount).toEqual(3750.5);
      expect(neighborhoods.type).toEqual("service");
      expect(neighborhoods.childType).toEqual("departments");
      expect(neighborhoods.departments).toBeTruthy();

      const publicSafety = services["Public Safety"];
      expect(publicSafety).toBeTruthy();
      expect(publicSafety.name).toEqual("Public Safety");
      expect(publicSafety.approvedAmount).toEqual(1600);
      expect(publicSafety.type).toEqual("service");
      expect(publicSafety.childType).toEqual("departments");
      expect(publicSafety.departments).toBeTruthy();

      const utilitiesTransport = services["Utilities & Transportation"];
      expect(utilitiesTransport).toBeTruthy();
      expect(utilitiesTransport.name).toEqual("Utilities & Transportation");
      expect(utilitiesTransport.approvedAmount).toEqual(5000);
      expect(utilitiesTransport.type).toEqual("service");
      expect(utilitiesTransport.childType).toEqual("departments");
      expect(utilitiesTransport.departments).toBeTruthy();
    });
  });

  it("Has expected department structure", async () => {
    await seattleBudgetData.then((data: any) => {
      const services = data["2020"].services;

      let departments: Department[] = [];
      for (const service in services) {
        for (const department in services[service].departments) {
          departments.push(services[service].departments[department]);
        }
      }
      expect(departments.length).toEqual(4);

      const constructionInspections =
        services["Neighborhoods & Development"].departments[
          "Seattle Department of Construction and Inspections"
        ];
      expect(constructionInspections).toBeTruthy();
      expect(constructionInspections.name).toEqual(
        "Seattle Department of Construction and Inspections"
      );
      expect(constructionInspections.approvedAmount).toEqual(3750.5);
      expect(constructionInspections.type).toEqual("department");
      expect(constructionInspections.childType).toEqual("programs");
      expect(constructionInspections.programs).toBeTruthy();

      const fireDept =
        services["Public Safety"].departments["Seattle Fire Department"];
      expect(fireDept).toBeTruthy();
      expect(fireDept.name).toEqual("Seattle Fire Department");
      expect(fireDept.approvedAmount).toEqual(1250);
      expect(fireDept.type).toEqual("department");
      expect(fireDept.childType).toEqual("programs");
      expect(fireDept.programs).toBeTruthy();

      const policeDept =
        services["Public Safety"].departments["Seattle Police Department"];
      expect(policeDept).toBeTruthy();
      expect(policeDept.name).toEqual("Seattle Police Department");
      expect(policeDept.approvedAmount).toEqual(350);
      expect(policeDept.type).toEqual("department");
      expect(policeDept.childType).toEqual("programs");
      expect(policeDept.programs).toBeTruthy();

      const cityLight =
        services["Utilities & Transportation"].departments[
          "Seattle City Light"
        ];
      expect(cityLight).toBeTruthy();
      expect(cityLight.name).toEqual("Seattle City Light");
      expect(cityLight.approvedAmount).toEqual(5000);
      expect(cityLight.type).toEqual("department");
      expect(cityLight.childType).toEqual("programs");
      expect(cityLight.programs).toBeTruthy();
    });
  });

  it("Has expected program structure", async () => {
    await seattleBudgetData.then((data: any) => {
      const services = data["2020"].services;

      let programs: Program[] = [];
      for (const service in services) {
        for (const department in services[service].departments) {
          for (const program in services[service].departments[department]
            .programs) {
            programs.push(
              services[service].departments[department].programs[program]
            );
          }
        }
      }
      expect(programs.length).toEqual(5);

      const permits =
        services["Neighborhoods & Development"].departments[
          "Seattle Department of Construction and Inspections"
        ].programs["Permit Services"];
      expect(permits).toBeTruthy();
      expect(permits.name).toEqual("Permit Services");
      expect(permits.approvedAmount).toEqual(1500);
      expect(permits.type).toEqual("program");
      expect(permits.childType).toEqual("expenses");
      expect(permits.expenses).toBeTruthy();

      const tech =
        services["Neighborhoods & Development"].departments[
          "Seattle Department of Construction and Inspections"
        ].programs["Process Improvements & Technology"];
      expect(tech).toBeTruthy();
      expect(tech.name).toEqual("Process Improvements & Technology");
      expect(tech.approvedAmount).toEqual(2250.5);
      expect(tech.type).toEqual("program");
      expect(tech.childType).toEqual("expenses");
      expect(tech.expenses).toBeTruthy();

      const fireOps =
        services["Public Safety"].departments["Seattle Fire Department"]
          .programs["Operations"];
      expect(fireOps).toBeTruthy();
      expect(fireOps.name).toEqual("Operations");
      expect(fireOps.approvedAmount).toEqual(1250);
      expect(fireOps.type).toEqual("program");
      expect(fireOps.childType).toEqual("expenses");
      expect(fireOps.expenses).toBeTruthy();

      const policeOps =
        services["Public Safety"].departments["Seattle Police Department"]
          .programs["Special Operations"];
      expect(policeOps).toBeTruthy();
      expect(policeOps.name).toEqual("Special Operations");
      expect(policeOps.approvedAmount).toEqual(350);
      expect(policeOps.type).toEqual("program");
      expect(policeOps.childType).toEqual("expenses");
      expect(policeOps.expenses).toBeTruthy();

      const cityLightCIP =
        services["Utilities & Transportation"].departments["Seattle City Light"]
          .programs["Customer Focused - CIP"];
      expect(cityLightCIP).toBeTruthy();
      expect(cityLightCIP.name).toEqual("Customer Focused - CIP");
      expect(cityLightCIP.approvedAmount).toEqual(5000);
      expect(cityLightCIP.type).toEqual("program");
      expect(cityLightCIP.childType).toEqual("expenses");
      expect(cityLightCIP.expenses).toBeTruthy();
    });
  });

  it("Has expected expense structure", async () => {
    await seattleBudgetData.then((data: any) => {
      const services = data["2020"].services;

      let expenses: Expense[] = [];
      for (const service in services) {
        for (const department in services[service].departments) {
          for (const program in services[service].departments[department]
            .programs) {
            for (const expense in services[service].departments[department]
              .programs[program].expenses) {
              expenses.push(
                services[service].departments[department].programs[program]
                  .expenses[expense]
              );
            }
          }
        }
      }

      expect(expenses.length).toEqual(8);

      const permitsCba =
        services["Neighborhoods & Development"].departments[
          "Seattle Department of Construction and Inspections"
        ].programs["Permit Services"].expenses["Permit Services CBA"];
      expect(permitsCba).toBeTruthy();
      expect(permitsCba.name).toEqual("Permit Services CBA");
      expect(permitsCba.description).toEqual("Permit Services CBA");
      expect(permitsCba.approvedAmount).toEqual(1500);
      expect(permitsCba.type).toEqual("expense");
      expect(permitsCba.childType).toBeUndefined();

      const techExp =
        services["Neighborhoods & Development"].departments[
          "Seattle Department of Construction and Inspections"
        ].programs["Process Improvements & Technology"].expenses[
          "Process Improvements and Tech"
        ];
      expect(techExp).toBeTruthy();
      expect(techExp.name).toEqual("Process Improvements and Tech");
      expect(techExp.description).toEqual("Process Improvements and Tech");
      expect(techExp.approvedAmount).toEqual(2250.5);
      expect(techExp.type).toEqual("expense");
      expect(techExp.childType).toBeUndefined();

      const battalion6 =
        services["Public Safety"].departments["Seattle Fire Department"]
          .programs["Operations"].expenses["Battalion 6"];
      expect(battalion6).toBeTruthy();
      expect(battalion6.name).toEqual("Battalion 6");
      expect(battalion6.description).toEqual("Battalion 6");
      expect(battalion6.approvedAmount).toEqual(500);
      expect(battalion6.type).toEqual("expense");
      expect(battalion6.childType).toBeUndefined();

      const battalion7 =
        services["Public Safety"].departments["Seattle Fire Department"]
          .programs["Operations"].expenses["Battalion 7"];
      expect(battalion7).toBeTruthy();
      expect(battalion7.name).toEqual("Battalion 7");
      expect(battalion7.description).toEqual("Battalion 7");
      expect(battalion7.approvedAmount).toEqual(250);
      expect(battalion7.type).toEqual("expense");
      expect(battalion7.childType).toBeUndefined();

      const fireComms =
        services["Public Safety"].departments["Seattle Fire Department"]
          .programs["Operations"].expenses["Communications"];
      expect(fireComms).toBeTruthy();
      expect(fireComms.name).toEqual("Communications");
      expect(fireComms.description).toEqual("Communications");
      expect(fireComms.approvedAmount).toEqual(500);
      expect(fireComms.type).toEqual("expense");
      expect(fireComms.childType).toBeUndefined();

      const policeOpsExp =
        services["Public Safety"].departments["Seattle Police Department"]
          .programs["Special Operations"].expenses["Special Operations"];
      expect(policeOpsExp).toBeTruthy();
      expect(policeOpsExp.name).toEqual("Special Operations");
      expect(policeOpsExp.description).toEqual("Special Operations");
      expect(policeOpsExp.approvedAmount).toEqual(350);
      expect(policeOpsExp.type).toEqual("expense");
      expect(policeOpsExp.childType).toBeUndefined();

      const cityLightBilling =
        services["Utilities & Transportation"].departments["Seattle City Light"]
          .programs["Customer Focused - CIP"].expenses["CUSTOMER AND BILLING"];
      expect(cityLightBilling).toBeTruthy();
      expect(cityLightBilling.name).toEqual("CUSTOMER AND BILLING");
      expect(cityLightBilling.description).toEqual("CUSTOMER AND BILLING");
      expect(cityLightBilling.approvedAmount).toEqual(2500);
      expect(cityLightBilling.type).toEqual("expense");
      expect(cityLightBilling.childType).toBeUndefined();

      const cityLightTransport =
        services["Utilities & Transportation"].departments["Seattle City Light"]
          .programs["Customer Focused - CIP"].expenses[
          "TRANSPORTATION RELOCATIONS"
        ];
      expect(cityLightTransport).toBeTruthy();
      expect(cityLightTransport.name).toEqual("TRANSPORTATION RELOCATIONS");
      expect(cityLightTransport.description).toEqual(
        "TRANSPORTATION RELOCATIONS"
      );
      expect(cityLightTransport.approvedAmount).toEqual(2500);
      expect(cityLightTransport.type).toEqual("expense");
      expect(cityLightTransport.childType).toBeUndefined();
    });
  });
});
