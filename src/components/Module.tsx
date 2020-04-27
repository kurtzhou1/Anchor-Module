import React, { useState, useEffect, useRef } from 'react'
// import classNames from 'classnames'
import  '../scss/css.scss'
import { Sticky } from 'react-sticky'
// import { schemaPositionId } from '@library/SchemaPositionID'

export interface fixed {
    startFixedY: number
    clickOffset: number
}

export interface mobileAndPc {
    mobile: fixed
    desktop: fixed
}

export interface options {
    fixed: mobileAndPc
}

export interface data {
    title: string
    anchorTo: string
}

export interface dataAll {
    data: data[]
}

export interface IProps {
    options: options
    data: dataAll
}

const Anchor: React.FC<IProps> = (props) => {
    const data = props.data.data
    const [activeID, setActiveID] = useState<string>('')
    const [activeIDForM, setActiveIDForM] = useState<string>(data[0].title)
    const pcFixStartingPoint = props.options.fixed.desktop.startFixedY
    const mFixStartingPoint = props.options.fixed.mobile.startFixedY
    const [mode, setMode] = useState(window.innerWidth >= 980 ? 'pc' : 'm')
    const topDistance = mode === 'pc' ? pcFixStartingPoint : mFixStartingPoint

    //點擊滑動
    const scrollToAnchor = (anchorName:string) => {
        let anchorElement:HTMLElement | null = document.getElementById(anchorName)
        if (anchorElement) {
            let currentY: number = window.pageYOffset //當前視窗距離天花板的高度
            let targetBlockY: number = anchorElement.getBoundingClientRect().y //目標點距離當前視窗高度
            // let headerOffset: number = mode === 'pc' ? 79 : 0
            // let offsetPosition: number = currentY + targetBlockY - headerOffset
            let offsetPosition: number = currentY + targetBlockY
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            })
            setOpenMenu(false)
        }
    }

    //滑動輪軸位置判斷
    // const activeIDRef = useRef(null)
    const targetData = useRef(null)
    // const currentBlockIndex = useRef<number>(0)
    // const defaultDistance: any = useRef(null)
    // const [defaultTopDistance, setDefaultTopDistance] = useState(0)
    // const getElementTop = (element) => {
    //     let actualTop = element.offsetTop
    //     let current = element.offsetParent
    //     while (current !== null) {
    //         actualTop += current.offsetTop
    //         current = current.offsetParent
    //     }
    //     return actualTop
    // }
    // useEffect(() => {
    //     document.addEventListener('scroll', onScroll)
    //     // setTimeout(onbeforeunload, 50)
    //     const sticky_bar: HTMLElement | null = document.querySelector('.sticky_bar')
    //     const menuDistance = sticky_bar ? sticky_bar.offsetHeight : 0
    //     setDefaultTopDistance(
    //         Math.floor(defaultDistance.current.getBoundingClientRect().y)
    //     )
    //     let ary = []
    //     for (let i = 0; i < data.length; i++) {
    //         let ele: HTMLElement = document.getElementById(data[i].anchorTo)
    //         ary[i] = {
    //             startPoint: getElementTop(ele) - topDistance - menuDistance,
    //             endPoint:
    //                 getElementTop(ele) -
    //                 topDistance +
    //                 ele.offsetHeight -
    //                 menuDistance,
    //             id: data[i].anchorTo,
    //         }
    //     }
    //     ary.sort((a, b) => (a.startPoint > b.startPoint ? 1 : -1))
    //     targetData.current = ary
    //     activeIDRef.current = { id: '', startPoint: 0, endPoint: 0 }
    //     onScroll()
    //     return () => {
    //         document.removeEventListener('scroll', onScroll)
    //     }
    // }, [])
    useEffect(()=>{
        onScroll()
    })

    const onScroll = () => {
        setMode(window.innerWidth >= 980 ? 'pc' : 'm')
        let currentY =
            mode === 'pc' ? window.pageYOffset + 80 : window.pageYOffset
        let targetCurrentStart =
            mode === 'pc'
                ? targetData.current[currentBlockIndex.current].startPoint
                : targetData.current[currentBlockIndex.current].startPoint
        let targetCurrentEnd =
            targetData.current[currentBlockIndex.current].endPoint
        if (
            //滾輪開始進入區域
            currentY >= targetCurrentStart &&
            currentY < targetCurrentEnd &&
            activeIDRef.current.id !==
                targetData.current[currentBlockIndex.current].id
        ) {
            let titleID = targetData.current[currentBlockIndex.current].id
            let titleShow = data.find((item) => item.anchorTo === titleID)
            setActiveIDForM(titleShow.title)
            setActiveID(targetData.current[currentBlockIndex.current].id)
            activeIDRef.current = targetData.current[currentBlockIndex.current]
        } else if (
            //離開區域至另外一個區域
            (currentY < targetCurrentStart || currentY >= targetCurrentEnd) &&
            activeIDRef.current.id !== ''
        ) {
            for (let i = 0; i < targetData.current.length; i++) {
                if (
                    currentY >= targetData.current[i].startPoint &&
                    currentY < targetData.current[i].endPoint &&
                    activeIDRef.current.id !== targetData.current[i].id
                ) {
                    let titleID = targetData.current[i].id
                    let titleShow = data.find(
                        (item) => item.anchorTo === titleID
                    )
                    setActiveIDForM(titleShow.title)
                    setActiveID(targetData.current[i].id)
                    activeIDRef.current = targetData.current[i]
                    currentBlockIndex.current = i
                }
            }
            if (
                //滾輪離開目標區域來到Header或Footer
                (currentY < targetData.current[0].startPoint ||
                    currentY >
                        targetData.current[targetData.current.length - 1]
                            .endPoint) &&
                activeIDRef.current.id !== ''
            ) {
                setActiveID('')
                activeIDRef.current = { id: '', startPoint: 0, endPoint: 0 }
            }
        }
    }


    //資料渲染-PC
    let dataIndexForPC = data.map((item: data) => (
        <li
            key={item.anchorTo}
            className={`${activeID === item.anchorTo ? 'click' : ''}`}
            onClick={() => scrollToAnchor(item.anchorTo)}
        >
            {item.title}
        </li>
    ))

    //資料渲染-Mobile
    const [openMenu, setOpenMenu] = useState(false)
    let mobileMenu = data.map((item: data) => {
        console.log('item.anchorTo=>>>',item.anchorTo)
        return (
            <li key={item.anchorTo}
                className={`${activeID === item.anchorTo ? 'click' : ''}`}
                onClick={() => scrollToAnchor(item.anchorTo)}>
                {item.title}
            </li>
        )
    })

    return(
        <div>
            <div className={openMenu ? 'anchor_mobileMenu_Open' : "anchor_mobileMenu_Close"} onClick={() => {setOpenMenu(false)}}></div>
            <Sticky disableCompensation>{({style})=>{
                return(
                    <div className="sticky_bar" style={{...style}}>
                        <ul className="isPC">{dataIndexForPC}</ul>
                        <ul className={`isM ${openMenu ? 'mobileMenuShow' : ''}`}
                            onClick={() => {setOpenMenu(true)}}>
                            {activeIDForM}
                        </ul>
                        <ul className={openMenu ? 'mobileMenu_Open' : 'mobileMenu_Close'}>
                            {mobileMenu}
                            <li onClick={() => {setOpenMenu(false)}}/>
                        </ul>
                    </div>)}}
            </Sticky>
        </div>
    )
}

export default Anchor
