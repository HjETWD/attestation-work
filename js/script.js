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

// * регистрируем события
document.addEventListener('click', e => {

	// * если кликнули по вкладке
	if (e.target.classList.contains('tab__link'))
	{
		// * блокируем стандартное поведение ссылки
		e.preventDefault();
		// * вызываем функцию переключения вкладки
		switchTab(e.target);
	}
})

// tabsContainer.addEventListener("click", (e) => {
// 	const clickedTab = e.target.closest("a");
// 	if (!clickedTab) return;
// 	e.preventDefault();

// 	switchTab(clickedTab);
// });

// * функция переключения вкладок
function switchTab(tab)
{
	console.log(tab.textContent);
}