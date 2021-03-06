
Feature('VipLink');

Before((I) => {
    I.login('admin', 'password');
});

Scenario('Test for Create VipLink', (I) => {
	var managerLink = '//*[@id="NationManagerLink"]';
	var vpPage = '//*[@href="#viplink"]';
	var crLink = '//div/button[@class="create btn btn-success"]';
	I.seeInCurrentUrl('#dashboard');
	I.waitForVisible(managerLink);
	I.waitForEnabled(managerLink);
	I.click(managerLink);
	I.seeInCurrentUrl('#dashboard');
	I.wait(3);
	I.waitForVisible(vpPage);
	I.waitForEnabled(vpPage);
	I.click(vpPage)
	I.seeInCurrentUrl('#viplink');
	I.wait(3);
	I.fillField('domain-name-name', "Your domain name");
	I.waitForVisible(crLink);
	I.waitForEnabled(crLink);
	I.click(crLink);
	I.wait(2);
	I.seeInPopup('Vip link successfully created');
	I.acceptPopup();
	I.wait(2);
	I.seeInCurrentUrl('#viplink')
	I.wait(3)
});

Scenario('Test for Delete VipLink', (I) => {
	var managerLink = '//*[@id="NationManagerLink"]';
	var vpPage = '//*[@href="#viplink"]';
	var del ='//*[@class="parentDiv"]/table/tbody/tr[2]/td[5]/button[2]';
	I.seeInCurrentUrl('#dashboard');
	I.waitForVisible(managerLink);
	I.waitForEnabled(managerLink);
	I.click(managerLink);
	I.seeInCurrentUrl('#dashboard');
	I.wait(3);
	I.waitForVisible(vpPage);
	I.waitForEnabled(vpPage);
	I.click(vpPage);
	I.seeInCurrentUrl('#viplink');
	I.wait(3);
	I.waitForVisible(del);
	I.waitForEnabled(del);
	I.click(del);
	I.seeInPopup("Are you sure that you want to delete this link?");
	I.acceptPopup();
	I.wait(2);
	I.seeInCurrentUrl('#viplink');
	I.wait(5);
});
