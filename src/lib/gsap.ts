import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP)

// Easing curves shared with CSS tokens
CustomEase.create('premium', '0.645,0.045,0.355,1')
CustomEase.create('soft', '0.22,1,0.36,1')
CustomEase.create('expo', '0.16,1,0.3,1')

export { gsap, ScrollTrigger, SplitText, useGSAP }
