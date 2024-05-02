export const guide_obj :any [] = [
    {
        subject: "Tile",
        contents: [{
            eng:"Guide: CO05 can allow only '5 tiles(1-2-2)' or 3 tiles(1-1-1) Grid style",
            kor: "[Tile 1] LSSSS, LLL  2개 타입만 허용"
        },{
            eng:"Guide: 5 tiles(1-2-2) grid system can use badge up to 2",
            kor:"[Tile 2] LSSSS : 2개까지 허용 / LLL : 1개까지 허용"
        },
        {
            eng:"Pass",
            kor:"Pass"
        }]
    },

    {
        subject : "Badge",
        contents : [{
            eng:"Guide: Badges can only contain the text New, Sale",
            kor:"[Badge 1] \"New\", \"Sale\" 두개의 뱃지만 허용"
        },
        {
            eng:"Guide: The badge's color guide was not followed.",
            kor:"[Badge 2] New-blue, Sale-red 조합만 가능"
        },
        {
            eng:"Pass",
            kor:"Pass"
        }]
    },

    {
        subject: "CTA",
        contents: [{
            eng:"Guide: Less than 25 characters",
            kor:"[CTA 1] CTA 문구는 25자를 넘어가면 안됨",
        },
        {
            eng:"Pass",
            kor:"Pass"
        }]
    },

    {
        subject: "Text",
        contents: [{ // text
            eng:"Guide: SKU cannot be included in text",
            kor:"SKU 사용불가",
        },{
            eng:"Guide: Check for the insertion of periods",
            kor:"문구 마지막에 온점 사용 불가"
        },{
            eng:"Guide: All words in titles cannot be written in uppercase, except 'Samsung'.",
            kor:"대문자 사용불가"
        },{
            eng:"Guide: Samsung' must be consistently written",
            kor:"\"Samsung\"으로만 표기"
        },{
            eng:"Guide: Unable to change font size",
            kor:"font-size 변경 불가"
        },{
            eng:"Guide: Unable to change font color",
            kor:"font-color 변경 불가"
        },{
            eng:"Guide: Unable to change fonts",
            kor:"font-family 변경 불가"
        },{
            eng:"Guide: Make sure there are no ellipsis (…) at the copy’s end.",
            kor:"ellipsis 불가"
        },{
            eng:"Guide: The text in the small tiles should be a maximum of two lines.",
            kor:"small Tile에서 최대 2줄까지만 허용"
        },{
            eng:"Guide: Small Tile's Description must be empty",
            kor:"small Tile에서 Description 사용 불가"
        },
        {
            eng:"Pass",
            kor:"Pass"
        }]
    },

    {
        subject: "BG Image",
        contents: [{ // image
            eng:"Guide: Background color must be transparent or #f4f4f4",
            kor:"Background Color Only #f4f4f4"
        },{
            eng:"Guide: The Samsung logo cannot be used in duplicate within the dotcom image except for the GNB logo.",
            kor:"Logo 사용불가"
        },{
            eng:"Guide: Tiles should show products only.",
            kor:"제품 이미지만 사용 가능"
        },
        {
            eng:"Guide: Use the new grid system to showcase multiple products in the big tile.",
            kor:"Big Tile 그리드 시스템에 따라 여러 제품 가능"
        },{
            eng:"Guide: Small tiles should show only one product. For multiple products (up to four), use the big tiles.",
            kor:"small Tile은 제품 1개만 가능"
        },{
            eng:"Guide: Image is not detected.",
            kor:"Image 없음"
        },
        {
            eng:"Pass",
            kor:"Pass"
        }]
    }
]