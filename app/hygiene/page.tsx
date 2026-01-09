'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { DragEvent as ReactDragEvent } from 'react'
import { CheckCircle, XCircle, RotateCcw, Sparkles } from 'lucide-react'
import { safeLocalStorage } from '@/utils/storage'
import { useLanguage } from '@/contexts/LanguageContext'

const morningImages: string[] = [
  'https://www.verywellhealth.com/thmb/eWRpvdKzUglKID4Xx7tLrrSOPQQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/VWH-GettyImages-1334658317-b1a9ea2a6c644f77bdd43b9a3d3b127c.jpg',
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIQFRAVEBUVFQ8PEBUPFRAQFRUWFhUVFRYYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGisfHh0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLSsrLSstLSstLf/AABEIALEBHAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUHBgj/xABBEAABAwIEBAMGAwYEBQUAAAABAAIDBBEFEiExBkFRYSIycQcTgZGhsUJSwRQzYnLR8COSwuGTo7LS8RUkNENz/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAMEAgEF/8QAJREAAwACAgICAgMBAQAAAAAAAAECAxEhMRJBE1EEcSIyYVIU/9oADAMBAAIRAxEAPwDcEEEEABBBBAAQQVfj2Lx0kD55T4WjQDd7j5Wt7koAi8S8TU9DHnnfqb5Ym2L5CPyjp3Oiw7jT2hVNcSxpMNNraGNx8Y6yO/F6bfdVPE+NSVs755Dq46NBuGM/C1vYfXdVJpydfojo6lshPcUixVgzD3HbqptNgbjvt8AsvIkbWOmUXuynYw4EEFwINwQSCF1UeCNA3/WwTjcLZzGvZY+ZDPgovOB/alPARHWF01Pawf5po+mp847HXvyW5UdUyVjZI3B0b2hzXtNwQV5xfgjHbGx62Xd+zTFJKNwpp3k00jrRHcRSuOg7BxPwPqtq0xVY3JrKCCC0YAggggAIIIIACSlJJQASCCCAAggggAIIIIAIqNUvsFIcq3EpLNKAM29o2JZWloO6xyZ1ySu39oVYXSWuuIK4aQ0QkkJwhJK4dG7IIyiQdPZiCCC0LAgiJRByAFLGfbXjeadlK0+GJoe4dZXjT5NI/wAxWzXXmXiys9/X1MlzrUPAJ1s1pLQLfytQBVxR3F9b9lbUOHXsTe3dClohlBBv6aW9V0VPBoPRIumVY4RFipQNgnPdqWGJ1sIKnZSivEaKSFWPuQifGsnSo2KtqKoabBw02P8AUdwoMsaSDZMihdzs3DBK330LHnzWs63Nw3Px3+KnLifZniOeN8ROrbOA7bf0XbKyXtEFLT0BBBBdOAQQQQAEgpaSUAEggggAIkaIoANAogUaAESFUOPTWY70KvJiuR4uqMsTvQoAxDiifPM491QlWOJuu8nuVAKybGykOS3JslB0SUSMokAeyPedkDJ2TH7R2STUjos/Ivs54MXNVAcio0eJi+rSPqmqyvAGxVTHXgu8vPks/Kvs0sb+jo/25vf5LzJWD/3Eh6yv8/4hnK9EftQt5SvPvEEWSqmaSB/jvO/IuJ2+K0r2cc6LnDspOlttcoNj/ZV9azVQcPRXdpYi245rpalzWszHYcupSmtsoT0itmmt1TkMxKpKiOWZ5PlHK5tYJiagmbqJbDoL3S3K+xnk/o6loJSnRHouXpXSDR0rj3cSrWlrJB5nXCy5/wBNKv8ACTI3qqusxGOPc/AJ+rrtDy+io/ch5vYW/M42HwXZS9nKb9HScD8WiGsj0tC8+7eegdoD6A2PwW7rzrh1O17gwZT2BH6L0JROvGw73jab9btCqxvaI8s6Y8gggmCgIIIIACSlJKACQQQQAERRokAEEaCBKAGZzos949qLRO9F3da+wKynj2rzXauM6kZhUG5UVwUuYaphwWTZHc1NFSHBMOCAEFEjKIroHrIylNPmKcLU08Lz22UrRXYhObbKmgrSHbK4xFuioAPEsqmjeky8ZiHaw6k2AHUrJ+K3tmqXyRgeIjxOFw+wAJHTZaBijXGnkDfMY3Wt6LhS1rHBjWl19SANG23TMWR+wrGmiXwtARuABY8/uOSmY5MAGt9TbpdP0UTWZraGwta3MKDiQu63YJ9dCpXJVvxWOPdzfmGgepKiVWPNsCHXDiQCwFzSRa4zGwvqrV9MLeS/y/UKFUxcsjfixpP0CWnPsa1Xop//AFJxs7XK7a7dSL25eiuKC7rX9UxBRgG5F/4QLD5BWtBYX08R+gXKa9Gpl+yoxiNzTsbdFEJeGgtyl99Q62jexJtftZdRWUuYajW3zVH7mziwj+q7FcHLnkbwtstwTI0Hn4Q8g3/CRay9A8HT56OEk3IZlJ/lJb9gFh8NAAL3PxWrezOsDoXxc2ODh/K4f1H1Tsd7ZPljS2dmgggnkwEEEEABIS0hAAQQRIACCCCAAUlxSkh6AKrFn+E+iyDid13O9Vr2JjwlZPxHF43LFDIOCqW6qM5WVbHqoTmoO6Izk08KQ8Jp4XAIzklOPCTZdOHrFyZkclPco8rl57ZSkQsRfouez+JXOIu0VAD4lhPY1Is3ElpHVpH0XACV0RL3DNHzLdHDrp2XexnRVOJYYXuuwC53Ztdx6ctV3G10zRTuqwHAX3bp3AJsl6OJJUbHMKmg1kaA5rwMrTms12xuN0019m3vr/eira4EpryLqOIEKPVQsaCTYW5lRKWstpf/AGVVU4h7+S2vuwdvza7nsk62N3of1k8rbR39HPVlDU0zRY5223vE/wC9lAcZNmM/TT4qLVYbO4X94G/w6n7Lqleznk/R07ZYXDwuzDkdFQYjiDHB7GtBP59NCD91VOwx+WxeLX1cwkE+qYioWs/+0hvVxFgtTKOOn7ROp8TNsrt+v97LSvZNcySnl7ofMu/2Kx2QjN4Xh42JC2L2MXLZ78mxC/fxn+ibjnVCctbk0tBRsRro4I3TSuDY2C7nHkOg6kmwA5krLOJOPH1QLIg6KnO5v45R0cR5R2Hz5J1Wp7J4h0+DQaji2iZmBqIyWAkht3bcgQLE+ig0HHtHK7KTJGDs+VoDT8Wk2+KyGhd711wPCDYd7c/76JzEn+NsTdLDM4j5Aff5JPzMo/8AOtHoGOQOAc0gtOzmkEEdiESwamqZKfxtkkZtcteWX9bHVTqniyrqYxH71/u83mFmudbSxcLEha+ZC3gZtaJZJwtxbUUpySF0sF75Xuu9ndjj/wBJ09FqOG4hFURiSJ4cw8xuD0cOR7Fbm1XQu8bjslIkaJbMASJE4m5tkAVmJbLMsej8blpGIv8ACVneLauKxQzGcXXw6qpniXT1cF1TVcVkl0UKCjkTZUioaowW0zFToS5qTkTxCQtC9Hp1zimJHFOuCYevLZWiuxB2ioQ7xK9xAaKiA8S1PRssWPNkcL/G3+YfdLgpJHDRjvW1vunRhkgIc4ANBBJLhtdZma3tIKc67HvaHSf4YfpZzLEn8zdQs3kH0/uy1PivEqeWmMTZGukFnBrdSLb/AHWUyyZHH5bbFehk56JsXHZEe7xFt/MCPS4UKVkrXkxWD3DmL/AKykZfU7jbRI2IPfdKTHtFrw1hQnzGasAsxxDD/hnMA069tXD4LtpuA4ZLmIANOWz3SOu0jzWGt+XTmuOgpmSAOGj+eU2N+oVrTYjWQ/uaw2vcxzNbID65hf5FMlr2Lqb9Mvh7Oog+5JdHb93nc0g9b219FzHtA4XLaVsUFFO+Qyss+OJ0uQN8ziW33DfmVbP4xxC1s1IP4mwuv9XkfRU03Fle1wP7W7U7e7iAA9Mui1uPRj48ns5Kk4ZqQWMbTT5idvdOHi101G/hd/lPRbJ7P6MUNK51UWwySSlxErg2zGgNaDc26n4rPYeIKmoqw3PmaXtO1tnb+G22/wAAtDq+EsOqDm95M1x3IncT/wAzMmwl2IyVXRS8XY2yteY43MfTRkbEEPktq4+l7D49VylBBRSPMU1SIYo2XLh55CPwsJBaD6/Lp2WJezSnET3wT1DpQ0kNc+NwcBqWnKwHa9u6zXEKIssAQQT6aFLuZVbpjsd041K/ZY4ZOxrSWgtaNmuNyBy15pvCz72V79CCQBYg7Xve22t0iloXhoDgRmGljceh6FWNZg0uHuZn1ZLEJGuDbC5AzMPcEj4EJHj2yjy6RW8YShjWt5uc1o9b7qwoGsZELuAGXc9OqpsZ8brvF2mN4YMmfK+7bHcWO/i1t0UzCr+6OY7NNut9rWQ5/imcVfza0Ko8Shkc6zr6hotcnS+tu9/oFZ0lXPRSCWJxBO7D5ZG/leP7I5LisPhDJGe7BY8OGbWwy87g9l31c1rotOl72/VFLwpaZyH8kvaNcw6sbNFHM3yyRteAdxmF7HuNlJVNwcQaKntyit8Wkg/UK5Vi6IWtMCRINEpJeunCgxQ2BWf4g7xlaBj3lPos5q5LuPql2OxIhStVPiESuiq6uClp8lsrg5aqYoFla1iry1MhisiEJsp5wTJTUJaPTrkGUrndh1KsI6cDU6lKc5Jx/i75oKz64kgPwqM+YuPa9gm8WdHSU8kzY2XYwkC2pPIXVkFUcctvQzfyj7hU/HMLhCfOqemzP5uK6mTxOfb+CPwgdupVXV4tLJ5nvI6Fxslfs2ibdTKF5G+z0VjS6JuFOAa8nctsP1VXiEWYHr20upMbrInC4W/Ix49lKZy3e47FOS1Atpbrc7d09V011UywkcjbotrTMVtF7SykAOaVOnkkcLh30uuNoMRdCcr/ACE7nl81ewY0yxFx1/8ACzUNGotMenhlO8j/AIGyrpoS03LnE/xElSpMVFtx2VViOItGt7nkOq4k2dqpR1fs+gDqpz76xwnTqXG36H5rQY3c1yPs2oT+zmZwGaRziNNQNAB9F1drBWStIgp7ZKhqnZgB8+y4riPAXM0GsZNmyHUt/hd3+662kPiU6SNr2lrxdpFiOyzceSN48jhmbyVL2NAyZiNgTbMbfTRWOP4x+3vbLkc2Njcghc6+Qi+Zwt8NewTVbB7p74zq9nlJ/E0+Uj10T8NEGsDAb2Gp6k6k/NS7a4LtKtMoaqnz5Q3dhJB5HsUIaXUHa41Hcdf75K5FJbX7IpYbEd3fcEfostndDOE04zEkDfeyn4k24526J2miACZr3aFcOnaezqfNR5fySvb87P8A9ZXULi/ZfIDDM3mJgbdiwD/Sfku0Vsf1R52T+zAkPS0ly2YOfx8eE+iy6pfZx9Vq2Msu0+iyXF/DI4d0rIOxBGRVtfInTKq2tlUrLp6K+o1Ub3afcbpTWLS4MVyRHsUZzVaSRqE9mqamJqT1M4ptKKSFURB3UTieHPSTtG5hdb1AupSeLczSDsQR80PlHU9MxujfmaD2CW8JljDFJJCd45XN+F9PpZP7ryqWmetL2tkKdlk20qbNGoMosupg0KemHtaRrulZ0zLqFpGWVGJ0jXXAXPy0bg6wJ+F10s4dsmRDonTehFwqKL9gl2ufmluog3nd36q2e+yTh1MZp44wNXyNHwvr9LrXm2Z8EjZ+G6T3dJEzmIm39SLqS9ine6DWho5AD5JDWaqnRI2MRQWTwaQpOTRDLou6ObKvEcLjmALhZ48rxuOdj1HZc9PC6FxY/cc+Th1C7It1Hqo2JUjJLtcPQ7EehSrxqh2PM5/RyXvElxuPSx+RU+q4ek/A5rh0d4SP0Kr6vDaiNpJYSLalpDrDrYaqasdfRXOWX7JoPysq7EXWB15fFQ4MaFrEbcwq3FMTJvYW9VjTGeSJeAcSS0cpfHYtIyuY7UOF769+/qtS4V4sjrbsy5Jmi5YTmDm7EtP6LCmOJVjgmKvppmSsPiYb2OzhzaexGibNtE941X7PQ6IquwHGoquISxHs5h8zHdCrEqoka0VeJMuCsh4rZllK2WsboVlfHNNZ2busWuBuJ8nIlyh1QUshNOjupmixMr2sUqKJOsgUhkaAIcsSgPj1V1IxQZItUJnKR6ORJdkmyuPNCATsaRZKagDLvaLQmGrEzR4Jma//AKN0P0t8lTUtcDotW4rwYVUBYLe8HiYTyeOXodlkTqLUggteCQQdCHDcFQ541W/s9D8e9zr6LTOCFFqIdLqPHE8bFOTe8A6qco0Q3tUaR3JOPqSHZXtt3RRx5nFbRkjtiJKZrJANAriSMNGipnQkuuVpMy0QxGSu19mmBl05ncPBGLNPV5/oPuqzBcEfUSBjB6u5Nb1K13DcPZTxNjYNAN+bjzJT8U7eybNSla9ipd0gBOkJJCqJB9uyTGjiOiREdUAG4eIJuqbrdOP8yEo3QBHsiYLlGE+xoaLlAHGcYcNC/voRZ27428+rmjr1C4t0QK1xji4k/XsuI4mwjJeaMf4bnatH4T19CkZY9opxZPTOUkhsopCsFFnjspylkzAcdlpJRJE7+Zh8r29HBbTwxxPDWsuw5ZQPHETqO46jusBcPmpFDXSQva+Nxa8G4c02TIvQm48j0XO3RcPxlQZmHRTeD+M2VbRHLZlRtblJ3HfsrfF6UOaU/tE6/i+TDnMsbIw1W/EeHGOQkDQqoBUz7LJe0KypQCSHJYK4bEuCivZqpZTJXDp6CASEsJLleeWGggggBTHclzfFXC4nvLDZs9tQfLKOjuh7roDulh65Uqlpmppy9ox1943mOVrmSDdjxb4jqO4TnvAtUxLDIahuWWNrxyuNR3B3C5at4AYf3U0jBya8CQD7H6qSvx36LI/JXs4HFWB1uqYp2WXYu9nkt/8A5DP+Gf8AuUmm4AA/eTuI6MYG/UkrKw39Gnnj7OQeARqrXCeFpJyDbJHfzuFrjsOa7nDuHaaHVrAXfnk8R+uyszIBsmz+P/0Jv8n1JCwzDIqZmVgt1cd3HqSnybo3a7omqlLRK3vlgISSE4UgoADNikMKMlJQAtx1ROOhSSUGG90ACFiarpL2YPinJpgxqi0bC45jzQA49uVuUblNy0zXAsIu3LYjrdSALuvyCOQhtyUAZbjuFup5Sw+XdrvzN/qqp60biKgNRGTbxN1aOvULPJBYqPJHiy3FfkiFIxMBTJQobtFhDGKjmcxwcCQ4G4INrLTuEeNhK0Q1J8WzZT+LoHd+6yxyKKUtKbL0KqUzXeLKEGJx5gLNpW5TZdLgGOvmjMDzmsPC7mB0PVVvENJkN7Itb5OY3rhlWHJbSobZE8x6WPJBTTksFEQuHUb+CicUV0V1eeYKuiuiuiJQAbijukFAFABkpJlKS5ybcUALMxTbpCiRFABEo0gJZQASNiK6TmQAbikEonOTRcgBd0aSwIpXWQAUj0IX6n0UUvuiJcfC0EuOgA1QAiS8smUeUblWjGgCw5IU+DSNbbbmbEXKMC2m33QAgm2nNMujJ1KlBqGRAEcRrPOMMPEcxLbWeM2Ucjz0XXcRY+ynGVtnSkaN5N7uWZ1tU98hke4ucTqT07dAkZaXRRhl72MSKHMpsqhzBIKSM4oiiciJWkYZ1Xs/izTHsF1fEuHZmGw5LnvZk28r/RaRXUuYJ0rgnp6ow2sYWOIQhmXW8UYLuQFxggc02XHAychaROT1lFpmFSspSnI1UbuiQQVhABBBBABIjsgggBBSHIIIASkuQQQATUpBBACSklGggBlyQgggB5uyjVKNBAEZqtOHv3h/lQQXDp0ZVHXfvD6o0EIGNMQcggunDKse/fSfzlUNSggoX2ehPSB+Eeiiv5oIIYIilIKCC0jjO49lv7x61KXZEgnz0S3/AGOYx7YrPKzz/FBBdZxD1Mn3oIJdDpP/2Q==',
];
const afternoonImages: string[] = [
  'https://c8.alamy.com/comp/2D6BYCY/independent-asian-child-make-up-her-room-and-fold-the-blanket-2D6BYCY.jpg'
]
const eveningImages: string[] = [
  'https://drophelia.com/cdn/shop/articles/How-to-wash-your-face-correctly.jpg?v=1639857161&width=2880'
]

// Add additional images per user request
const morningExtra: string[] = [
  'https://www.shutterstock.com/image-photo/little-girl-bedroom-pretty-fold-600nw-441527410.jpg',
  'https://www.savvymom.ca/wp-content/uploads/2014/09/recipegeek-food_talk-5_tips_to_get_your_kids_to_eat_lunch_at_school.jpg',
  'https://beminimalist.co/cdn/shop/articles/Untitled_design_5.jpg?v=1605688766'
]
const afternoonExtra: string[] = [
  'https://experiencelife.lifetime.life/wp-content/uploads/2021/09/drink-to-your-health.jpg',
  'https://images.ctfassets.net/0dkgxhks0leg/3JZwqA70n6pycTGGfpCd2u/8d64b358badd39327e858dc822df1cec/blog-large-K12-girleatinglunch.jpg',
  'https://ysm-res.cloudinary.com/image/upload/ar_16:9,c_fill,dpr_3.0,f_auto,g_faces:auto,q_auto:eco,w_500/v1/yms/prod/9ef76b20-8505-479f-bfa0-c474228d7335',
  'https://images.theconversation.com/files/293319/original/file-20190920-22408-pnr51f.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1000&fit=clip'
]
const eveningExtra: string[] = [
  'https://static.wixstatic.com/media/199181_7444dbcf4c0f453d9fa7396e4a4d7f22~mv2.jpg/v1/fill/w_568,h_320,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/199181_7444dbcf4c0f453d9fa7396e4a4d7f22~mv2.jpg',
  'https://as1.ftcdn.net/jpg/02/98/78/92/1000_F_298789272_1G5bD1zkb3sbyeREHeVUmR3zi5pNqC4i.jpg',
  'https://www.premierdentistryofeagle.com/wp-content/uploads/brush-your-teeth-the-right-way-tips-for-a-clean-and-healthy-smile-scaled.jpeg',
  'https://healthgroup.dk/wp-content/themes/yootheme/cache/04/hg-blog-nat-1-0499384d.jpeg'
]

// Compose final arrays
// Combined sequence (Morning -> Afternoon -> Evening) with headers
type SeqItem = { src?: string; label: string; type?: 'header' | 'item' }
const morningSequence: SeqItem[] = [
  { label: 'Morning', type: 'header', src: 'https://marketplace.canva.com/i6hl4/MAGybbi6hl4/1/tl/canva-sunrise-over-mountain-landscape-MAGybbi6hl4.jpg' },
  { src: 'https://www.shutterstock.com/image-photo/little-girl-bedroom-pretty-fold-600nw-441527410.jpg', label: 'Tidy Up Bed', type: 'item' },
  { src: 'https://drophelia.com/cdn/shop/articles/How-to-wash-your-face-correctly.jpg?v=1639857161&width=2880', label: 'Washing Face', type: 'item' },
  { src: 'https://phuongphandental.com/wp-content/uploads/2019/05/aggressive-tooth-brushing.jpg', label: 'Brushing Teeth', type: 'item' },
  { src: 'https://media.baamboozle.com/uploads/images/1881138/b8d85355-ad5d-4ca4-aae5-9197957d7dce.jpeg', label: 'Exercise', type: 'item' },
  { src: 'https://images.ctfassets.net/0dkgxhks0leg/3JZwqA70n6pycTGGfpCd2u/8d64b358badd39327e858dc822df1cec/blog-large-K12-girleatinglunch.jpg', label: 'Eating Breakfast', type: 'item' }
]
const morningAll = morningSequence.filter(i => i.src).map(i => i.src as string)
// Afternoon sequence: Eating Lunch, Drinking Water, Taking Nap, Reading Books
const afternoonSequence: SeqItem[] = [
  {
    src: 'https://images.ctfassets.net/0dkgxhks0leg/3JZwqA70n6pycTGGfpCd2u/8d64b358badd39327e858dc822df1cec/blog-large-K12-girleatinglunch.jpg',
    label: 'Eating Lunch',
    type: 'item'
  },
  {
    src: 'https://experiencelife.lifetime.life/wp-content/uploads/2021/09/drink-to-your-health.jpg',
    label: 'Drinking Water',
    type: 'item'
  },
  {
    src: 'https://ysm-res.cloudinary.com/image/upload/ar_16:9,c_fill,dpr_3.0,f_auto,g_faces:auto,q_auto:eco,w_500/v1/yms/prod/9ef76b20-8505-479f-bfa0-c474228d7335',
    label: 'Taking Nap',
    type: 'item'
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2vCdhTdOLUdc2FZEAOTaK0QzHARUGzGI4Zw&s',
    label: 'Reading Books',
    type: 'item'
  }
]
      const handleQuickAdd = (itemId: string) => {
        const item = availableRoutineItems.find(i => i.id === itemId)
        if (item && !routineItems.find(r => r.id === item.id)) {
          setRoutineItems([...routineItems, { ...item, category: quickAddTime }])
        }
      }

      const removeRoutineItem = (id: string) => {
        setRoutineItems(routineItems.filter(item => item.id !== id))
      }

      const handleGameDrop = (itemId: string, category: string) => {
        if (gameSubmitted) return
        setGameAnswers({ ...gameAnswers, [itemId]: category })
      }

      const handleGameSubmit = () => {
        setGameSubmitted(true)
      }

      const getGameScore = () => {
        let correct = 0
        hygieneGameItems.forEach(item => {
          if (gameAnswers[item.id] === item.category) {
            correct++
          }
        })
        return { correct, total: hygieneGameItems.length }
      }

      const resetGame = () => {
        setGameItems([...hygieneGameItems].sort(() => Math.random() - 0.5))
        setGameAnswers({})
        setGameSubmitted(false)
      }

      const playLabel = (text: string) => {
        if (!text) return
        if (typeof window === 'undefined') return
        const synth = window.speechSynthesis
        if (!synth) return
        try {
          synth.cancel()
          const u = new SpeechSynthesisUtterance(text)
          u.rate = 0.95
          u.pitch = 1.0
          synth.speak(u)
        } catch (e) {
          console.warn('TTS not available', e)
        }
      }

      const playGreeting = (text: string) => {
        if (!text) return
        if (typeof window === 'undefined') return
        const synth = window.speechSynthesis
        if (!synth) return
        try {
          synth.cancel()
          const u = new SpeechSynthesisUtterance(text)
          u.rate = 1.05
          u.pitch = 1.3
          synth.speak(u)
        } catch (e) {
          console.warn('TTS not available', e)
        }
      }

      return (
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => { setActiveTime('morning'); playGreeting('Good Morning') }}
                className={`rounded-full text-white shadow-md transition-all ${
                  activeTime === 'morning'
                    ? 'px-8 py-3 text-lg font-bold bg-gradient-to-r from-primary-500 to-secondary-500'
                    : 'px-4 py-2 text-sm bg-white text-black border border-gray-200'
                }`}
              >
                Morning
              </button>
              <button
                onClick={() => { setActiveTime('afternoon'); playGreeting('Good Afternoon') }}
                className={`rounded-full text-white shadow-md transition-all ${
                  activeTime === 'afternoon'
                    ? 'px-8 py-3 text-lg font-bold bg-gradient-to-r from-primary-500 to-secondary-500'
                    : 'px-4 py-2 text-sm bg-white text-black border border-gray-200'
                }`}
              >
                Afternoon
              </button>
              <button
                onClick={() => { setActiveTime('evening'); playGreeting('Good Evening') }}
                className={`rounded-full text-white shadow-md transition-all ${
                  activeTime === 'evening'
                    ? 'px-8 py-3 text-lg font-bold bg-gradient-to-r from-primary-500 to-secondary-500'
                    : 'px-4 py-2 text-sm bg-white text-black border border-gray-200'
                }`}
              >
                Evening
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex flex-col items-center gap-8">
                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(() => {
                  const items =
                    activeTime === 'morning'
                      ? morningSequence
                      : activeTime === 'afternoon'
                      ? afternoonSequence
                      : eveningSequence

                  return items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`w-full overflow-hidden rounded-lg bg-gray-100 flex flex-col items-center ${
                        item.label ? 'cursor-pointer' : ''
                      }`}
                      onClick={() => item.label && playLabel(item.label)}
                      role={item.label ? 'button' : undefined}
                      tabIndex={item.label ? 0 : undefined}
                    >
                      <div className="w-full h-80 overflow-hidden">
                        <img src={item.src} alt={`${activeTime}-routine-${idx}`} className="w-full h-full object-cover" />
                      </div>
                      {item.label ? (
                        <div className="mt-2 text-center font-medium text-black">{item.label}</div>
                      ) : null}
                    </div>
                  ))
                })()}
              </div>
            </div>
          </motion.div>
        </div>
      )
    }
                ? 'px-8 py-3 text-lg font-bold bg-gradient-to-r from-primary-500 to-secondary-500'

