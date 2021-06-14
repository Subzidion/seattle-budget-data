import seattleBudgetData from "../dist/index";

it("Loads Data", async () => {
  await seattleBudgetData.then((data: any) => {
    expect(data).toBeTruthy();
    expect(data["2019"]).toBeUndefined();

    expect(data["2020"].approvedAmount).toEqual(10350.5);

    expect(Object.keys(data["2020"].services).length).toEqual(3);
  });
});
