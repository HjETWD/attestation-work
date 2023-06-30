console.log('%cСкрипт для Вкладок загружен.', 'color:hsl(200 100% 70%)');

// * переменные
const tabs = document.getElementById('tabs');
const tabsList = document.getElementById('tabsList');
const tabsContent = document.getElementById('tabsContent');
const tabLinks = tabsList.querySelectorAll('.tab__link');
const tabPanels = tabsContent.querySelectorAll('.tab__panel');
const tabPanelsLinkBack = tabsContent.querySelectorAll('.tab__link-back');

// * добавляем роль - список вкладок
tabsList.setAttribute('role', 'tablist');

// * обходим все элементы списка и задаем им роль - презентация
tabsList.querySelectorAll('li').forEach(tabItem => tabItem.setAttribute('role', 'presentation'));

// * обходим все ссылки 'Вернуться к списку вкладок' и прячем их
tabPanelsLinkBack.forEach(link => {
	link.classList.add('visually-hidden');
	link.setAttribute('tabindex', '-1');
});

// * обходим каждую вкладку в списке
tabLinks.forEach((tabContent, index) => {

	// * добавляем ссылке роль - вкладка
	tabContent.setAttribute('role', 'tab');

	// * если это первая ссылка
	if (index === 0)
	{
		// * указываем, что эта вкладка выбрана
		tabContent.setAttribute('aria-selected', 'true');

		console.log('%cТекущая вкладка - '+tabContent.textContent, 'color:hsl(300 100% 70%)');
	}
	else
	{
		// * у всех остальных вкладок отключаем переход по кнопке Tab
		tabContent.setAttribute('tabindex', '-1');

		// * прячем все вкладки с помощью атрибута скрытия
		tabPanels[index].setAttribute('hidden', '');
	}
});

// * обходим всё содержимое вкладок
tabPanels.forEach(panel => {
	// * устанавливаем каждому содержимому вкладки возможность быть выбранным через Tab
	panel.setAttribute('tabindex', '0');
	// * добавляем содержимому вкладке роль - содержимое вкладки
	panel.setAttribute('role', 'tabpanel');
});

// * регистрируем событие - клик
document.addEventListener('click', e => {

	// * если кликнули по ссылкам вкладок
	if (e.target.classList.contains('tab__link'))
	{
		// * блокируем стандартное поведение ссылки
		e.preventDefault();
		// * вызываем функцию переключения вкладки
		switchTab(e.target);
	}
})

// * регистрируем событие - нажатие кнопи
tabs.addEventListener('keydown', e => {

	// * проверяем код нажатой кнопки
	switch (e.key) {
		// * нажата стрелка Влево
		case 'ArrowLeft':
			moveLeft();
			break;
		// * нажата стрелка Вправо
		case 'ArrowRight':
			moveRight();
			break;
		// * нажата стрелка В начало
		case 'Home':
			e.preventDefault();
			switchTab(tabLinks[0]);
			break;
		// * нажата стрелка В конец
		case 'End':
			e.preventDefault();
			switchTab(tabLinks[tabLinks.length - 1]);
			break;
	}
});

// * функция переключения вкладок
function switchTab(newTab)
{
	const activePanelId = newTab.getAttribute('href');
	const activePanel = tabs.querySelector(activePanelId);

	// * прячем другие ссылки-вкладки
	tabLinks.forEach(link => {
		link.classList.remove('tab__link--active');
		link.setAttribute('aria-selected', false);
		link.setAttribute('tabindex', '-1');
	});

	// * прячем всё содержимое вкладок
	tabPanels.forEach(panel => {
		panel.setAttribute('hidden', true);
	});

	// * показываем содержимое активной вкладки
	activePanel.removeAttribute('hidden', false);

	// * делаем ссылку-вкладку активной
	newTab.classList.add('tab__link--active');
	newTab.setAttribute('aria-selected', true);
	newTab.setAttribute('tabindex', '0');

	// * ставим на ссылке-вкладке фокус
	newTab.focus();

	console.log('%cНовая вкладка – ' + newTab.textContent, 'color:hsl(120 100% 70%)')
}
// * функция переключения вкладки при нажатии кнопки Влево
function moveLeft()
{
	// * получаем активную вкладку
	const currentTab = document.activeElement;

	// * переключаем вкладку
	switchTab(
		// * если предыдущей вкладки нет - переходим на последнюю
		(!currentTab.parentElement.previousElementSibling) ?
		tabLinks[tabLinks.length - 1] :
		// * если предыдущая вкладка есть - переходим на неё
		currentTab.parentElement.previousElementSibling.querySelector('.tab__link')
	);
}
// * функция переключения вкладки при нажатии кнопки Вправо
function moveRight()
{
	// * получаем активную вкладку
	const currentTab = document.activeElement;

	// * переключаем вкладку
	switchTab(
		// * если предыдущей вкладки нет - переходим на последнюю
		(!currentTab.parentElement.nextElementSibling) ?
		tabLinks[0] :
		// * если предыдущая вкладка есть - переходим на неё
		currentTab.parentElement.nextElementSibling.querySelector('.tab__link')
	);
}