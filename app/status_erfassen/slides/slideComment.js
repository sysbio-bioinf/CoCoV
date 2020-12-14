let slide = `
<GridLayout id="event" row="0" rows="auto,*,auto">    
    <Label row="0" text="{{ eventQuery }}" textWrap="true" fontSize="{{ mySize }}" class="question text-center" />
    <TextView row="1" id="note" text="{{note}}" hint="{{ diaryCommentHint }}" autocorrect="false" maxLength="160" fontSize="{{ mySize }}" returnKeyType="done" textChange="{{ doneTap }}" class="input my-input my-input-comment" />
    <Button row="2" text="{{ nextSlideButton }}" fontSize="{{ mySize }}" class="-btn btn-primary my-button-primary my-button-grad3:active" margin="5" tap="{{ switchTab }}" /> 
</GridLayout>
`;

module.exports = {slide};
