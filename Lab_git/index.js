const techs = ['Python', 'Django', 'DRF', 'Pydantic', 'Linux', 'Celery', 'Reddis', 'PostgreSQL', 'JS', 'Vue3', 'Pinia']

document.body.getElementsByClassName('card__list')[0].append(...techs.map((tech) => {
    const span = document.createElement('span')
    span.textContent = tech

    return span
}))

const tgCard = document.getElementsByClassName('card__tg')[0]
const tgSend = document.getElementsByClassName('tg-send')[0]
const root = document.documentElement

tgCard.addEventListener('mouseover', () => tgSend.style.right = 0)
tgCard.addEventListener('mouseout', () => tgSend.style.right = root.style.getPropertyValue('--tg-send-right'))

tgSend.addEventListener('click', () => window.open('https://t.me/none_donone_v1', '_blank'))
