let slide = `
<GridLayout id="coronatestdate" row="0" rows="auto, *, *, *, * ">
    <Label id="questionLabel" row="0" text="{{ coronaTestDateQuery }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ coronaTestDateAnswer0 }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <DatePicker id="CoronaTDate" row="3" year="2020" month="11" day="1" date="{{ date }}" class="my-picker text-center"></DatePicker>
    <Button row="4" id="3" text="{{ coronaTestDateAnswer1 }}" class="-btn my-button-grad2 my-button-grad2:active capitalization" tap="{{ datetoTextswitchTab }}" />
</GridLayout>
`;

module.exports = {slide};


