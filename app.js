const regForm = document.querySelector('[data-js="regForm"]')
const prevBtn = document.querySelector('[data-js="prevBtn"]')
const nextBtn = document.querySelector('[data-js="nextBtn"]')

const tabsState = () => {
    const tabs = Array.from(document.querySelectorAll('[data-js="tab"]'))

    const numbersOfTabs = tabs.length
    const lastIndexTabs = tabs.length - 1

    return [
        tabs,
        lastIndexTabs,
        numbersOfTabs
    ]
}

const currentTabState = () => {
    let currentTab = 0

    const getcurrentTab = () => currentTab
    const nextTab = () => currentTab++
    const previousTab = () => --currentTab

    return [
        getcurrentTab,
        nextTab,
        previousTab
    ]
}

const stepsIndicatorState = () => {
    const stepsIndicator = Array
        .from(document.querySelectorAll('[data-js="stepsIndicator"]'))

    const setStepIndicator = (currentTab) => {
        stepsIndicator.forEach(step => step.classList.remove('active'))

        stepsIndicator[currentTab].classList.add('active')

        return stepsIndicator[currentTab]
    }

    return [
        stepsIndicator,
        setStepIndicator
    ]
}


const [getcurrentTab, nextTab, previousTab] = currentTabState()
const [tabs, lastIndexTabs, numbersOfTabs] = tabsState()
const [stepsIndicator, setStepIndicator] = stepsIndicatorState()


const handleDisplayElement = (element, stylePropertyValue) => (
    element.style.display = stylePropertyValue
)

const handleButtonsPrevAndNext = () => {
    const currentTab = getcurrentTab()

    currentTab === 0
        ? handleDisplayElement(prevBtn, 'none')
        : handleDisplayElement(prevBtn, 'inline')

    currentTab === lastIndexTabs
        ? nextBtn.textContent = "Submit"
        : nextBtn.textContent = "Next"

    currentTab === lastIndexTabs
        ? nextBtn.addEventListener('click', submitForm)
        : void (0)
}

const submitForm = () => {
    alert('Dados enviados com sucesso!')
    regForm.submit()
}

const validateForm = () => {
    const currentTabNumber = getcurrentTab()
    let valid = true;

    const inputs = Array.from(tabs[currentTabNumber].querySelectorAll('input'))

    inputs.forEach(input => {
        const isValid = input.checkValidity()

        if (!isValid) {
            input.classList.add('invalid')
            valid = false
        }

    })

    if (valid) {
        const currentStep = setStepIndicator(currentTabNumber)
        currentStep.classList.add('finish')
    }

    return valid; // return the valid status
}

const handlePrevTab = () => {
    const currentTabNumber = getcurrentTab()

    const notTheFirstTab = currentTabNumber >= 0

    if (notTheFirstTab) {
        const currentTab = tabs[currentTabNumber]
        handleDisplayElement(currentTab, 'none')

        previousTab()
        const previousTabNumber = getcurrentTab()
        const tab = tabs[previousTabNumber]
        setStepIndicator(previousTabNumber)

        handleDisplayElement(tab, "block")
        handleButtonsPrevAndNext()
    }
}

const handleNetxTab = () => {
    const currentTabNumber = getcurrentTab()

    const notTheLastTab = currentTabNumber < lastIndexTabs
    const formFieldsIsValid = validateForm()

    if (notTheLastTab && formFieldsIsValid) {
        const currentTab = tabs[currentTabNumber]
        handleDisplayElement(currentTab, 'none')

        nextTab()
        const nextTabNumber = getcurrentTab()
        const tab = tabs[nextTabNumber]
        setStepIndicator(nextTabNumber)

        handleDisplayElement(tab, "block")
        handleButtonsPrevAndNext()
    }

}

const showTab = () => {
    const currentTab = getcurrentTab()
    const tab = tabs[currentTab]

    handleDisplayElement(tab, "block")
    handleButtonsPrevAndNext()

    setStepIndicator(getcurrentTab())
}

nextBtn.addEventListener('click', handleNetxTab)
prevBtn.addEventListener('click', handlePrevTab)

showTab(); // Display the current tab