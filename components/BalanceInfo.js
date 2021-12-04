import React from 'react'
import { View, Text, Image } from 'react-native'
import { SIZES, COLORS, FONTS, icons } from '../constants'

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
    return (
        <View
        style={{
            ...containerStyle
        }}
        >
            {/* Title */}
            <Text style={{ ...FONTS.h3, color: COLORS.lightGray3}}>{title}</Text>

            {/* Figures */}
            <View
            style={{
                flexDirection: "row",
                alignItems: "flex-end"
            }}
            >
                <Text
                style={{
                    ...FONTS.h3,
                    color: COLORS.lightGray3
                }}
                >₹</Text>
                <Text
                style={{
                    ...FONTS.h2,
                    color: COLORS.white,
                    marginLeft: SIZES.base
                }}
                >{displayAmount.toLocaleString()}</Text>
                <Text
                style={{
                    ...FONTS.h3,
                    color: COLORS.lightGray3,
                    marginLeft: 3
                }}
                >
                    INR
                </Text>
            </View>

            {/* Change Percentage */}
            <View
            style={{
                flexDirection: "row",
                alignItems: "flex-end"
            }}
            >

            </View>
        
        </View>
    )
}

export default BalanceInfo

