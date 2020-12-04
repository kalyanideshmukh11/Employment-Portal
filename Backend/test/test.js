describe('Search by company name', () => {
  it('Search by company name', () => {
    agent
      .post('/company/search/company')
      .send({
        company_name: 'mic',
      })
      //   .set(
      //     'Authorization',
      //     'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE4ODU3YzIxNmE1NTI2NDljYTgxOTkiLCJlbWFpbCI6ImR2YWRlckBnbWFpbC5jb20iLCJpYXQiOjE2MDQ5MDAyNzcsImV4cCI6MTYwNTkwODI3N30.V2eMhlVbg7r_5CNoZ3dU3Q8fE06tI_9AnXMpIpih43c'
      //   )
      .then(function (res) {
        expect(res.status).to.equal('200');
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
